import Players from '~icons/players.svg?react'
import { concatClasses } from '~utils/concatClasses'
import { CourseInclusions } from '../CourseInclusions'

import * as styles from './CourseDetails.css'
interface Props {
  players: string
  inclusions?: string[]
  isMiniCard?: boolean
  prices?: string[]
  tees?: string[]
}

export const CourseDetails = (props: Props) => {
  const { prices, players, isMiniCard, inclusions } = props

  const formattedPrices = prices ? prices.map((price) => `$${price}`).join(' / ') : `$${prices}`

  return (
    <div
      className={styles.courseCardDetailsWrapper({
        variant: isMiniCard ? 'secondary' : 'default',
      })}
    >
      <ul className={styles.courseCardList}>
        <li
          className={concatClasses([
            styles.courseCardListItem({
              variant: isMiniCard ? 'secondary' : 'default',
            }),
            styles.coursePrice({
              variant: isMiniCard ? 'secondary' : 'default',
            }),
          ])}
        >
          {formattedPrices}
        </li>
        <li
          className={styles.courseCardListItem({
            variant: isMiniCard ? 'secondary' : 'default',
          })}
        >
          <Players
            className={styles.icons({
              variant: isMiniCard ? 'secondary' : 'default',
            })}
            height={30}
            width={30}
          />
          {players}
        </li>
      </ul>
      {inclusions && <CourseInclusions tournament={{ inclusions: inclusions }} />}
    </div>
  )
}
