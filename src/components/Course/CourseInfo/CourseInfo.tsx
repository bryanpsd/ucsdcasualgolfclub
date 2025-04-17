import * as styles from "./CourseInfo.css";
import Players from "../../../icons/players.svg?react";
import GolfBall from "../../../icons/golf_ball.svg?react";
import Cart from "../../../icons/golf_cart.svg?react";
import { concatClasses } from "~utils/concatClasses";

interface Props {
  price: number;
  players: number;
  amenities?: string[];
}

const amenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Balls":
      return <GolfBall height={30} width={30} aria-hidden="true" />;
    case "Cart":
      return <Cart height={30} width={30} aria-hidden="true" />;
    default:
      return null;
  }
};

export const CourseInfo = (props: Props) => {
  const { price, players, amenities } = props;

  return (
    <ul className={styles.courseCardList}>
      <li
        className={concatClasses([
          styles.courseCardListItem,
          styles.coursePrice,
        ])}
      >
        ${price}
      </li>
      <li className={styles.courseCardListItem}>
        <Players height={30} width={30} />
        {players}
      </li>
      {amenities?.map((amenity, index) => (
        <li key={index} className={styles.courseCardListItem}>
          {amenityIcon(amenity)}
          <span className="sr-only">{amenity}</span>
        </li>
      ))}
    </ul>
  );
};
