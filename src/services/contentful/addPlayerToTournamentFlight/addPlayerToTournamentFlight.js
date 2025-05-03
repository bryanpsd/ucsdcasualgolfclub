import contentful from 'contentful-management'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Contentful configuration
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID

// Initialize Contentful client
const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
})

async function addPlayerToTournamentFlight(tournamentTitle) {
  try {
    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    // Fetch the Tournament entry by title
    const tournamentEntries = await environment.getEntries({
      content_type: 'tournament', // Replace with your Tournament content type ID
      'fields.title[match]': tournamentTitle, // Use the correct field ID for the title
      limit: 1,
    })

    if (!tournamentEntries.items.length) {
      console.error(`No Tournament found with the title: ${tournamentTitle}`)
      return
    }

    const tournament = tournamentEntries.items[0]
    let resultsJson = tournament.fields.resultsJson?.['en-US']

    if (!resultsJson) {
      console.error(`The Tournament "${tournamentTitle}" does not have a resultsJson field.`)
      return
    }

    // Check if resultsJson is already an object
    if (typeof resultsJson === 'string') {
      resultsJson = JSON.parse(resultsJson)
    }

    // Initialize fields for First Flight and Second Flight if not already present
    if (!tournament.fields.firstFlight) {
      tournament.fields.firstFlight = { 'en-US': [] }
    }
    if (!tournament.fields.secondFlight) {
      tournament.fields.secondFlight = { 'en-US': [] }
    }

    // Fetch all Player entries
    const playerEntries = await environment.getEntries({
      content_type: 'leaders', // Replace with your Player content type ID
      limit: 1000, // Adjust limit as needed
    })

    const players = playerEntries.items.map((player) => ({
      id: player.sys.id,
      name: player.fields.playerName?.['en-US'],
    }))

    // Iterate through the results
    for (const result of resultsJson) {
      const { title, flight } = result

      // Ensure the title is a string
      if (typeof title !== 'string') {
        console.warn(`Skipping entry with invalid title: ${JSON.stringify(title)}`)
        continue
      }

      // Find the matching player by name
      let matchingPlayer = players.find((player) => player.name === title)

      // If no matching player is found, create a new Player entry
      if (!matchingPlayer) {
        console.log(`No Player found with the name: ${title}. Creating a new Player entry.`)
        try {
          const newPlayer = await environment.createEntry('leaders', {
            fields: {
              playerName: {
                'en-US': title,
              },
              results: {
                'en-US': [], // Initialize with an empty results array
              },
            },
          })

          // Publish the new Player entry
          await newPlayer.publish()
          console.log(`Created and published new Player entry: ${title}`)

          // Add the new player to the players list
          matchingPlayer = {
            id: newPlayer.sys.id,
            name: title,
          }
          players.push(matchingPlayer)
        } catch (error) {
          console.error(`Error creating Player entry for "${title}":`, error)
          continue
        }
      }

      // Add the player to the appropriate flight field
      if (flight === 'First Flight') {
        if (
          !tournament.fields.firstFlight['en-US'].some(
            (entry) => entry.sys.id === matchingPlayer.id
          )
        ) {
          tournament.fields.firstFlight['en-US'].push({
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: matchingPlayer.id,
            },
          })
          console.log(`Added "${title}" to First Flight`)
        }
      } else if (flight === 'Second Flight') {
        if (
          !tournament.fields.secondFlight['en-US'].some(
            (entry) => entry.sys.id === matchingPlayer.id
          )
        ) {
          tournament.fields.secondFlight['en-US'].push({
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: matchingPlayer.id,
            },
          })
          console.log(`Added "${title}" to Second Flight`)
        }
      } else {
        console.log(`Skipping player "${title}" with flight "${flight}"`)
      }
    }

    // Update the Tournament entry in Contentful
    await tournament.update()
    console.log('Tournament entry has been updated with First Flight and Second Flight players.')
  } catch (error) {
    console.error('Error updating tournament:', error)
  }
}

// Run the script
const tournamentTitleArg = process.argv[2]
if (!tournamentTitleArg) {
  console.error('Please provide a Tournament Title as an argument.')
  process.exit(1)
}

addPlayerToTournamentFlight(tournamentTitleArg)
