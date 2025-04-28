import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import contentful from "contentful-management";

// Contentful configuration
const SPACE_ID = "pzpj6n7gq2ak";
const ACCESS_TOKEN = "CFPAT-ey2MInbXh26X4plQO0Z5iKHpPvahP3VXs4mZjy1QrYo";
const ENVIRONMENT_ID = "master";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON file
const resultsFilePath = path.join(__dirname, "../results/results.json");
const resultsData = JSON.parse(fs.readFileSync(resultsFilePath, "utf-8"));

// Initialize Contentful client
const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

async function pushResultsToContentful() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    const courseEntries = await environment.getEntries({
      content_type: "course",
    });

    const courseMap = courseEntries.items.reduce((map, item) => {
      const courseName = item.fields?.course?.["en-US"]; // Safely access the name field
      if (courseName) {
        map[courseName] = item.sys.id;
      } else {
        console.warn(
          `Course entry missing 'name' field or 'en-US' locale: ${item.sys.id}`
        );
      }
      return map;
    }, {});

    // Extract course name and date
    const { "Course Name": courseName, Date: date } = resultsData[0];
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

    // Process each result entry
    for (let i = 1; i < resultsData.length; i++) {
      const result = resultsData[i];

      const courseId = courseMap[result.course];
      if (!courseId) {
        console.warn(`No matching course found for: ${result.course}`);
        continue;
      }

      // Create entry title
      const entryTitle = `${result.title} - ${courseName} (${formattedDate})`;

      // Create Contentful entry for results
      const entry = await environment.createEntry("results", {
        fields: {
          title: {
            "en-US": entryTitle,
          },
          course: {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: courseId,
              },
            },
          },
          flight: {
            "en-US": result.flight,
          },
          gross: {
            "en-US": result.gross,
          },
          net: {
            "en-US": result.net,
          },
          courseHandicap: {
            "en-US": result.courseHandicap,
          },
          putts: {
            "en-US": result.putts,
          },
          closestTo: {
            "en-US": result.closestTo !== null ? result.closestTo : undefined,
          },
          longDrive: {
            "en-US": result.longDrive !== "" ? result.longDrive : undefined,
          },
        },
      });

      console.log(`Created draft entry: ${entryTitle}`);

      // Add the results entry to the Player content type
      const playerEntries = await environment.getEntries({
        content_type: "leaders", // Replace with your Player content type ID
        "fields.playerName[match]": result.title, // Match Player name with result title
      });

      if (playerEntries.items.length > 0) {
        const player = playerEntries.items[0];
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

        console.log(`Added result to Player: ${result.title}`);
      } else {
        console.warn(`No matching Player found for: ${result.title}`);
      }
    }

    console.log(
      "All results have been pushed to Contentful and linked to Players."
    );
  } catch (error) {
    console.error("Error pushing results to Contentful:", error);
  }
}

// Run the script
pushResultsToContentful();
