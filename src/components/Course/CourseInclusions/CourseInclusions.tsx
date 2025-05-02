import React from 'react'
import Cart from '../../../icons/golf_cart.svg?react'
import GolfBallNavy from '../../../icons/golf_ball_navy.svg?react'
import GolfBallWhite from '../../../icons/golf_ball_white.svg?react'
import WalkingIcon from '../../../icons/walking.svg?react'

import * as styles from './CourseInclusions.css'
import { ResponsiveHeadline } from '~components/ResponsiveHeadline'

interface Tournament {
  inclusions: string[]
}

export const CourseInclusions = ({
  tournament,
  isMiniCard,
}: {
  tournament: Tournament
  isMiniCard?: boolean
}) => {
  const inclusionIcons: Record<string, React.ElementType> = {
    Cart: Cart,
    'Range Balls': isMiniCard ? GolfBallWhite : GolfBallNavy,
    Walking: WalkingIcon,
  }

  return (
    <div
      className={styles.courseInclusionsWrapper({
        variant: isMiniCard ? 'secondary' : 'default',
      })}
    >
      <ResponsiveHeadline
        size={1}
        as="h3"
        className={styles.courseInclusionsWrapper({
          variant: isMiniCard ? 'secondary' : 'default',
        })}
      >
        Inclusions:
      </ResponsiveHeadline>
      <ul
        className={styles.courseInclusionsList({
          variant: isMiniCard ? 'secondary' : 'default',
        })}
      >
        {tournament.inclusions.map((inclusion, index) => {
          const [key, value] = inclusion.split(':').map((item) => item.trim())
          const Icon = inclusionIcons[key]

          return (
            <li
              className={styles.courseInclusionsListItem({
                variant: isMiniCard ? 'secondary' : 'default',
              })}
              key={index}
            >
              {Icon ? (
                <>
                  <Icon
                    className={styles.courseInclusionsIcon({
                      variant: isMiniCard ? 'secondary' : 'default',
                    })}
                    height={30}
                    width={30}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{inclusion}</span>
                  {value && <span>{value}</span>}
                </>
              ) : (
                <span>{inclusion}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
