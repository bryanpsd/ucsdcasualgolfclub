import contentful from "contentful-management";
import dotenv from "dotenv";
import fetch from "node-fetch";
import xlsx from "xlsx";

// Load environment variables from .env file
dotenv.config();

// Contentful configuration
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID;

// Initialize Contentful client
const client = contentful.createClient({
	accessToken: ACCESS_TOKEN,
});

// Helper function to format date to ISO 8601
const formatDateToISO = (date) => new Date(date).toISOString();

// Main function to process tournaments in the Course content type
async function processCourseTournaments(tournamentName) {
	try {
		const space = await client.getSpace(SPACE_ID);
		const environment = await space.getEnvironment(ENVIRONMENT_ID);

		// Fetch all Course entries
		const courses = await environment.getEntries({
			content_type: "course",
		});

		for (const course of courses.items) {
			const courseName = course.fields.courseName?.["en-US"];
			const tournaments = course.fields.tournaments?.["en-US"] || [];

			if (!courseName) {
				console.warn(`⚠️  Course "${course.sys.id}" is missing a courseName.`);
			}

			for (const tournamentLink of tournaments) {
				const tournamentId = tournamentLink.sys.id;
				const tournament = await environment.getEntry(tournamentId);

				const tournamentTitle = tournament.fields.title?.["en-US"];

				// Skip tournaments that don't match the provided name
				if (tournamentName && tournamentTitle !== tournamentName) {
					continue;
				}

				if (tournament.sys.publishedVersion) {
					console.log(`🏌️  Processing published Tournament: ${tournamentTitle}`);
					await processTournament(tournament, courseName, course);
				}
			}
		}
	} catch (error) {
		console.error("Error processing Course tournaments:", error);
	}
}

async function processTournament(tournament, courseName, course) {
	try {
		const firstFlightPlayers = tournament.fields.firstFlight?.["en-US"] || []; // Existing players in First Flight
		const secondFlightPlayers = tournament.fields.secondFlight?.["en-US"] || []; // Existing players in Second Flight

		if (firstFlightPlayers.length > 0 && secondFlightPlayers.length > 0) {
			console.log(
				`⏭️  Skipping Tournament "${tournament.fields.title?.["en-US"]}" - flights already populated`,
			);
			return;
		}

		const resultsExcelRef = tournament.fields.resultsExcel?.["en-US"];
		const tournamentDate = tournament.fields.date?.["en-US"];

		if (!resultsExcelRef) {
			console.log(
				`ℹ️  Tournament "${tournament.fields.title?.["en-US"]}" has no resultsExcel field - skipping`,
			);
			return;
		}

		const space = await client.getSpace(SPACE_ID);
		const environment = await space.getEnvironment(ENVIRONMENT_ID);
		const resultsExcelAsset = await environment.getAsset(resultsExcelRef.sys.id);
		const resultsExcelUrl = resultsExcelAsset.fields.file?.["en-US"]?.url;

		if (!resultsExcelUrl) {
			console.log(
				`⚠️  Tournament "${tournament.fields.title?.["en-US"]}" has invalid resultsExcel asset (missing URL)`,
			);
			return;
		}

		if (!tournamentDate) {
			console.error(`The Tournament "${tournament.fields.title?.["en-US"]}" is missing a date.`);
			return;
		}

		const response = await fetch(`https:${resultsExcelUrl}`);
		const arrayBuffer = await response.arrayBuffer();
		const workbook = xlsx.read(arrayBuffer, { type: "array" });
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const jsonData = xlsx.utils.sheet_to_json(sheet);

		let currentFlight = null; // Track the current flight across rows

		for (const row of jsonData) {
			let name = row.Name ? String(row.Name).trim() : null;

			// Remove the text "(guest)" from the name/title field
			if (name) {
				name = name.replace(/\(guest\)/gi, "").trim();
			}

			// Update currentFlight based on the name
			if (name === "1st Flight") {
				currentFlight = "First Flight";
				console.log(`📋 Switching to: ${currentFlight}`);
			} else if (name === "2nd Flight") {
				currentFlight = "Second Flight";
				console.log(`📋 Switching to: ${currentFlight}`);
			}

			const index = row.Index ? Number.parseFloat(row.Index) : null;
			const gross = row.Gross ? Number.parseFloat(row.Gross) : null;
			const courseHandicap = row["Crs Hcp"] ? Number.parseFloat(row["Crs Hcp"]) : null;
			const net = row.Net ? Number.parseFloat(row.Net) : null;
			const putts = row.Putts ? Number.parseInt(row.Putts, 10) : null;

			// Convert closestTo to an array and handle "Closest To" text
			const closestToRaw = row["Closest To"] ? String(row["Closest To"]).trim() : null;
			const closestTo =
				closestToRaw && !closestToRaw.toLowerCase().includes("closest to")
					? closestToRaw.split(",").map((item) => item.trim())
					: [];

			const longDrive = row["Long Drive"] ? String(row["Long Drive"]).trim() : null;

			const resultData = {
				title: name ? name.split(",").reverse().join(" ").trim() : null, // Swap text and remove first comma
				index: Number.isNaN(index) ? null : index,
				gross: Number.isNaN(gross) ? null : gross,
				courseHandicap: Number.isNaN(courseHandicap) ? null : courseHandicap,
				net: Number.isNaN(net) ? null : net,
				putts: Number.isNaN(putts) ? null : putts,
				closestTo: closestTo, // Ensure closestTo is always an array
				longDrive: longDrive === "M" || longDrive === "F" || longDrive === "B" ? longDrive : "",
				course: courseName,
				date: formatDateToISO(tournamentDate),
				flight: currentFlight, // Use the currentFlight value
			};

			const formattedDate = new Date(formatDateToISO(tournamentDate)).toLocaleDateString("en-US", {
				year: "2-digit",
				month: "2-digit",
				day: "2-digit",
			});

			const entryTitle = `${resultData.title} - ${courseName} (${formattedDate})`;

			try {
				// Check if an entry with the same title already exists
				const existingEntries = await environment.getEntries({
					content_type: "results", // Replace with your Results content type ID
					"fields.title[match]": entryTitle,
					limit: 1,
				});

				if (existingEntries.items.length > 0) {
					console.log(`⏭️  Result already exists: ${resultData.title} - skipping`);
					continue;
				}

				// Create Contentful entry for results
				const entry = await environment.createEntry("results", {
					fields: {
						title: {
							"en-US": entryTitle,
						},
						date: {
							"en-US": resultData.date,
						},
						course: {
							"en-US": {
								sys: {
									type: "Link",
									linkType: "Entry",
									id: course.sys.id,
								},
							},
						},
						flight: {
							"en-US": resultData.flight,
						},
						index: {
							"en-US": resultData.index,
						},
						gross: {
							"en-US": resultData.gross !== null ? resultData.gross : undefined,
						},
						net: {
							"en-US": resultData.net !== null ? resultData.net : undefined,
						},
						courseHandicap: {
							"en-US": resultData.courseHandicap !== null ? resultData.courseHandicap : undefined,
						},
						putts: {
							"en-US": resultData.putts !== null ? resultData.putts : undefined,
						},
						closestTo: {
							"en-US":
								Array.isArray(resultData.closestTo) && resultData.closestTo.length > 0
									? resultData.closestTo
									: undefined,
						},
						longDrive: {
							"en-US": resultData.longDrive !== "" ? resultData.longDrive : undefined,
						},
					},
				});

				console.log(`✅ Created draft entry: ${resultData.title}`);

				// Add the results entry to the Player content type
				const playerEntries = await environment.getEntries({
					content_type: "leaders", // Replace with your Player content type ID
					"fields.playerName[match]": name, // Match Player name with result title
				});

				let player;
				if (playerEntries.items.length > 0) {
					player = playerEntries.items[0];
				} else {
					// Create a new Player entry if not found
					player = await environment.createEntry("leaders", {
						fields: {
							playerName: {
								"en-US": resultData.title,
							},
							results: {
								"en-US": [],
							},
						},
					});
					console.log(`➕ Created new Player: ${name}`);
				}

				const existingResults = player.fields.results?.["en-US"] || [];

				// Add the new result entry to the Player's results field
				existingResults.push({
					sys: {
						type: "Link",
						linkType: "Entry",
						id: entry.sys.id,
					},
				});

				// Update the Player entry
				player.fields.results = {
					"en-US": existingResults,
				};

				await player.update();

				console.log(`🔗 Linked result to Player: ${name}`);

				// Add player to the appropriate flight if not already present
				const playerLink = {
					sys: {
						type: "Link",
						linkType: "Entry",
						id: player.sys.id,
					},
				};

				if (currentFlight === "First Flight") {
					if (!firstFlightPlayers.some((p) => p.sys.id === player.sys.id)) {
						firstFlightPlayers.push(playerLink);
					}
				} else if (currentFlight === "Second Flight") {
					if (!secondFlightPlayers.some((p) => p.sys.id === player.sys.id)) {
						secondFlightPlayers.push(playerLink);
					}
				}
			} catch (error) {
				console.error(`Error processing result for "${name}":`, error);
			}
		}

		// Update the tournament with players in each flight
		tournament.fields.firstFlight = {
			"en-US": firstFlightPlayers,
		};
		tournament.fields.secondFlight = {
			"en-US": secondFlightPlayers,
		};

		await tournament.update();
		console.log("✅ Updated tournament with First Flight and Second Flight players");
	} catch (error) {
		console.error("Error processing Tournament:", error);
	}
}
// Run the script
const tournamentName = process.argv[2];
processCourseTournaments(tournamentName);
