import contentful from 'contentful-management';
import dotenv from 'dotenv';

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

// Get the Tournament Title from the command-line arguments
const tournamentTitleArg = process.argv[2];
if (!tournamentTitleArg) {
  console.error('Please provide a Tournament Title as an argument.');
  process.exit(1);
}

async function pushResultsToContentful() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    // Fetch the Tournament entry with the matching title
    const tournamentEntries = await environment.getEntries({
      content_type: 'tournament', // Replace with your Tournament content type ID
      'fields.title[match]': tournamentTitleArg, // Match the Tournament Title
    });

    if (tournamentEntries.items.length === 0) {
      console.error(
        `No Tournament found with the title: ${tournamentTitleArg}`
      );
      return;
    }

    const tournament = tournamentEntries.items[0]; // Use the first matching Tournament entry
    const resultsJson = tournament.fields.resultsJson?.['en-US']; // Extract resultsJson

    if (!resultsJson) {
      console.error(
        `The Tournament "${tournamentTitleArg}" does not have a resultsJson field.`
      );
      return;
    }

    const resultsData =
      typeof resultsJson === 'string' ? JSON.parse(resultsJson) : resultsJson;

    const courseEntries = await environment.getEntries({
      content_type: 'course',
    });

    const courseMap = courseEntries.items.reduce((map, item) => {
      const courseName = item.fields?.course?.['en-US']; //
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
    const { 'Course Name': courseName, Date: date } = resultsData[0];
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
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
      const entry = await environment.createEntry('results', {
        fields: {
          title: {
            'en-US': entryTitle,
          },
          course: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: courseId,
              },
            },
          },
          flight: {
            'en-US': result.flight,
          },
          index: {
            'en-US': result.index,
          },
          gross: {
            'en-US': result.gross !== null ? result.gross : undefined,
          },
          net: {
            'en-US': result.net !== null ? result.net : undefined,
          },
          courseHandicap: {
            'en-US':
              result.courseHandicap !== null
                ? result.courseHandicap
                : undefined,
          },
          putts: {
            'en-US': result.putts !== null ? result.putts : undefined,
          },
          closestTo: {
            'en-US': Array.isArray(result.closestTo)
              ? result.closestTo
              : result.closestTo !== null
              ? [result.closestTo]
              : undefined,
          },
          longDrive: {
            'en-US': result.longDrive !== '' ? result.longDrive : undefined,
          },
        },
      });

      console.log(`Created draft entry: ${entryTitle}`);

      // Add the results entry to the Player content type
      const playerEntries = await environment.getEntries({
        content_type: 'leaders', // Replace with your Player content type ID
        'fields.playerName[match]': result.title, // Match Player name with result title
      });

      if (playerEntries.items.length > 0) {
        const player = playerEntries.items[0];
        const existingResults = player.fields.results?.['en-US'] || [];

        // Add the new result entry to the Player's results field
        existingResults.push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: entry.sys.id,
          },
        });

        // Update the Player entry
        player.fields.results = {
          'en-US': existingResults,
        };

        await player.update();

        console.log(`Added result to Player: ${result.title}`);
      } else {
        console.warn(`No matching Player found for: ${result.title}`);
      }
    }

    console.log(
      'All results have been pushed to Contentful and linked to Players.'
    );
  } catch (error) {
    console.error('Error pushing results to Contentful:', error);
  }
}

// Run the script
pushResultsToContentful();
