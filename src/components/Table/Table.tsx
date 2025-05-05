import React, { type ReactNode } from 'react'
import * as styles from './Table.css'

type TableCell =
  | string
  | ReactNode
  | {
      value: string | ReactNode
      className?: string
    }

type Props = {
  thead: string[]
  colSpan?: number
  tbody: Array<Array<TableCell>>
  tfoot?: string[]
}

export const Table: React.FC<Props> = ({ thead, tbody, tfoot, colSpan = 0 }) => {
  return (
    <table className={styles.table}>
      {thead && (
        <thead className={styles.thead}>
          <tr>
            {thead.map((header, index) => (
              <th key={index} colSpan={colSpan} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tbody.map((row, rowIndex) => (
          <tr key={rowIndex} className={styles.tr}>
            {row.map((cell, cellIndex) =>
              cellIndex === 0 ? (
                // Render the first cell as a <th>
                <th
                  key={cellIndex}
                  scope="row"
                  className={`${styles.th} ${
                    cell && typeof cell === 'object' && 'className' in cell && cell.className
                      ? cell.className
                      : ''
                  }`}
                  {...(typeof cell === 'string' && cell.includes('<a')
                    ? { dangerouslySetInnerHTML: { __html: cell } }
                    : {})}
                >
                  {cell && typeof cell === 'object' && 'value' in cell
                    ? cell.value
                    : typeof cell === 'string' && !cell.includes('<a')
                      ? cell
                      : null}
                </th>
              ) : (
                // Render the remaining cells as <td>
                <td
                  key={cellIndex}
                  className={`${styles.td} ${
                    cell && typeof cell === 'object' && 'className' in cell && cell.className
                      ? cell.className
                      : ''
                  }`}
                  {...(typeof cell === 'string' && cell.includes('<a')
                    ? { dangerouslySetInnerHTML: { __html: cell } }
                    : {})}
                >
                  {cell && typeof cell === 'object' && 'value' in cell ? cell.value : cell}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
      {tfoot && (
        <tfoot className={styles.tfoot}>
          <tr>
            {tfoot.map((footer, index) => (
              <th key={index} colSpan={colSpan} className={styles.th}>
                {footer}
              </th>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  )
}
