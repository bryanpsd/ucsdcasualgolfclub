import React, { useState } from 'react'
import { Table } from '~components/Table'

import * as styles from './TournamentResults.css'

export interface Result {
  title: string | null
  date: string | null
  gross: number | null
  putts: number | null
  net: number | null
  courseHandicap: number | null
  closestTo: string[] | null
  longDrive: 'F' | 'M' | 'B' | null
  flight: 'First Flight' | 'Second Flight' | null
  course?: {
    name: string
    slug: string
  } | null
}

export interface Player {
  playerName: string
  results: Result[]
}

type TournamentResultsProps = {
  players: Player[]
  selectedPlayer?: string
}

export const TournamentResults: React.FC<TournamentResultsProps> = ({
  players,
  selectedPlayer: initialSelectedPlayer = '',
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState(initialSelectedPlayer)

  const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayer(event.target.value)
  }

  return (
    <div>
      <select
        id="playerSelect"
        value={selectedPlayer}
        onChange={handlePlayerChange}
        className={styles.select}
      >
        <option value="">Select a Player</option>
        {players
          .slice()
          .sort((a, b) => a.playerName.localeCompare(b.playerName))
          .map((player, index) => (
            <option key={index} value={player.playerName}>
              {player.playerName}
            </option>
          ))}
      </select>

      {selectedPlayer ? (
        players
          .filter((player) => player.playerName === selectedPlayer)
          .map((player, playerIndex) => (
            <div key={playerIndex} className={styles.resultTableWrapper}>
              {player.results.length > 0 ? (
                <Table
                  thead={[
                    'Course',
                    'Date',
                    'Flight',
                    'Gross',
                    'Course Handicap',
                    'Net',
                    'Putts',
                    'Closest To',
                    'Long Drive',
                    'Tournament Results',
                  ]}
                  tbody={player.results
                    .slice()
                    .sort((a, b) => {
                      const dateA = a.date ? new Date(a.date).getTime() : 0
                      const dateB = b.date ? new Date(b.date).getTime() : 0
                      return dateB - dateA // Sort in descending order
                    })
                    .map((result) => {
                      // Extract year from the date
                      const year = result.date ? new Date(result.date).getFullYear() : null

                      // Use the course slug
                      const courseSlug = result.course?.slug || null

                      // Construct the URL for the tournament
                      const tournamentUrl =
                        year && courseSlug
                          ? `/tournaments/${year}/${courseSlug}#results-link`
                          : null

                      const selected = players.find((p) => p.playerName === selectedPlayer)
                      const selectedResults = selected?.results || []
                      const lowestGross =
                        selectedResults.length > 0
                          ? Math.min(
                              ...selectedResults.map((r) =>
                                typeof r.gross === 'number' ? r.gross : Infinity
                              )
                            )
                          : null
                      const lowestNet =
                        selectedResults.length > 0
                          ? Math.min(
                              ...selectedResults.map((r) =>
                                typeof r.net === 'number' ? r.net : Infinity
                              )
                            )
                          : null
                      const lowestPutts =
                        selectedResults.length > 0
                          ? Math.min(
                              ...selectedResults.map((r) =>
                                typeof r.putts === 'number' ? r.putts : Infinity
                              )
                            )
                          : null

                      return [
                        result.course?.name || 'N/A',
                        result.date !== null
                          ? new Date(result.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'N/A',
                        result.flight !== null ? result.flight : 'N/A',
                        {
                          value: result.gross !== null ? result.gross.toString() : 'N/A',
                          className:
                            typeof result.gross === 'number' && result.gross === lowestGross
                              ? styles.highlighted
                              : undefined,
                        },
                        result.courseHandicap !== null ? result.courseHandicap.toString() : 'N/A',
                        {
                          value: result.net !== null ? result.net.toString() : 'N/A',
                          className:
                            typeof result.net === 'number' && result.net === lowestNet
                              ? styles.highlighted
                              : undefined,
                        },
                        {
                          value: result.putts !== null ? result.putts.toString() : 'N/A',
                          className:
                            typeof result.putts === 'number' && result.putts === lowestPutts
                              ? styles.highlighted
                              : undefined,
                        },
                        result.closestTo && result.closestTo.length > 0
                          ? result.closestTo.join(', ')
                          : null,
                        result.longDrive !== null ? result.longDrive : null,
                        tournamentUrl ? (
                          <a className={styles.resultsLink} href={tournamentUrl}>
                            Results
                          </a>
                        ) : (
                          'N/A'
                        ),
                      ]
                    })}
                />
              ) : (
                <p>No results available for this player.</p>
              )}
            </div>
          ))
      ) : (
        <p className={styles.intro}>Please select a player to view their results.</p>
      )}
    </div>
  )
}
