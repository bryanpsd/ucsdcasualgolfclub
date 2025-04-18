import Players from "../../../icons/players.svg?react";
import GolfBallWhite from "../../../icons/golf_ball_white.svg?react";
import GolfBallNavy from "../../../icons/golf_ball_navy.svg?react";
import Cart from "../../../icons/golf_cart.svg?react";

import { concatClasses } from "~utils/concatClasses";
import * as styles from "./CourseInfo.css";

interface Props {
  price: number;
  players: number;
  amenities?: string[];
  isMiniCard?: boolean;
  coursePar?: number;
  mensTees?: string;
  womensTees?: string;
  prices?: string[];
}

const amenityIcon = (amenity: string, isMiniCard?: boolean) => {
  switch (amenity) {
    case "Balls":
      return isMiniCard ? (
        <GolfBallWhite height={30} width={30} aria-hidden="true" />
      ) : (
        <GolfBallNavy height={30} width={30} aria-hidden="true" />
      );
    case "Cart":
      return (
        <Cart
          className={styles.icons({
            variant: isMiniCard ? "secondary" : "default",
          })}
          height={30}
          width={30}
          aria-hidden="true"
        />
      );
    default:
      return null;
  }
};

export const CourseInfo = (props: Props) => {
  const {
    price,
    prices,
    players,
    amenities,
    isMiniCard,
    coursePar,
    mensTees,
    womensTees,
  } = props;

  // Format prices with dollar signs
  const formattedPrices = prices
    ? prices.map((price) => `$${price}`).join(" / ")
    : `$${price}`;

  return (
    <div
      className={styles.courseCardInfoWrapper({
        variant: isMiniCard ? "secondary" : "default",
      })}
    >
      <ul className={styles.courseCardList}>
        <li
          className={concatClasses([
            styles.courseCardListItem({
              variant: isMiniCard ? "secondary" : "default",
            }),
            styles.coursePrice({
              variant: isMiniCard ? "secondary" : "default",
            }),
          ])}
        >
          {formattedPrices}
        </li>
        <li
          className={styles.courseCardListItem({
            variant: isMiniCard ? "secondary" : "default",
          })}
        >
          <Players
            className={styles.icons({
              variant: isMiniCard ? "secondary" : "default",
            })}
            height={30}
            width={30}
          />
          {players}
        </li>
        {amenities?.map((amenity, index) => (
          <li
            key={index}
            className={styles.courseCardListItem({
              variant: isMiniCard ? "secondary" : "default",
            })}
          >
            {amenityIcon(amenity, isMiniCard)}
            <span className="sr-only">{amenity}</span>
          </li>
        ))}
      </ul>
      {coursePar !== undefined ||
      mensTees !== undefined ||
      womensTees !== undefined ? (
        <ul
          className={styles.courseCardCourseInformationList({
            variant: isMiniCard ? "secondary" : "default",
          })}
        >
          {coursePar !== undefined && (
            <li className={styles.courseCardCourseInformationListItem}>
              Par {coursePar}
            </li>
          )}
          {mensTees !== undefined && (
            <li className={styles.courseCardCourseInformationListItem}>
              Men {mensTees}
            </li>
          )}
          {womensTees !== undefined && (
            <li className={styles.courseCardCourseInformationListItem}>
              Women {womensTees}
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};
