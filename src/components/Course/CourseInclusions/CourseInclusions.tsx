import Cart from "../../../icons/golf_cart.svg?react";
import GolfBall from "../../../icons/golf_ball_navy.svg?react";
import WalkingIcon from "../../../icons/walking.svg?react";

import * as styles from "./CourseInclusions.css";
import { ResponsiveHeadline } from "~components/ResponsiveHeadline";

interface Tournament {
  inclusions: string[];
}

const inclusionIcons: Record<string, React.ElementType> = {
  Cart: Cart,
  "Range Balls": GolfBall,
  Walking: WalkingIcon,
};

export const CourseInclusions = ({
  tournament,
}: {
  tournament: Tournament;
}) => {
  return (
    <div className={styles.courseInclusionsWrapper}>
      <ResponsiveHeadline size={1} as="h3">
        Inclusions:
      </ResponsiveHeadline>
      <ul className={styles.courseInclusionsList}>
        {tournament.inclusions.map((inclusion, index) => {
          const [key, value] = inclusion.split(":").map((item) => item.trim());
          const Icon = inclusionIcons[key];

          return (
            <li
              className={styles.courseInclusionsListItem({
                variant: "default",
              })}
              key={index}
            >
              {Icon ? (
                <>
                  <Icon height={30} width={30} aria-hidden="true" />
                  <span className="sr-only">{inclusion}</span>
                  {value && <span>{value}</span>}
                </>
              ) : (
                <span>{inclusion}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
