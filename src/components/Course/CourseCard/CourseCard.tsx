import { ResponsiveHeadline } from "~components/ResponsiveHeadline";
import { Button } from "../../Button/Button";
import * as styles from "./CourseCard.css";
import type { TypeCourseFields } from "../../../types/contentful";

export const CourseCard = ({
  date,
  notes,
  price,
  players,
  slug,
  results,
  courseName,
  amenities,
}: TypeCourseFields) => {
  return (
    <div>
      <div className={styles.date}>{date}</div>
      <div>
        <ResponsiveHeadline>{notes}</ResponsiveHeadline>
        <ResponsiveHeadline>{courseName}</ResponsiveHeadline>
      </div>
      <ul>
        <li>{price}</li>
        <li>{players}</li>
      </ul>
      <div>
        <Button
          as="a"
          round
          color="primary"
          variant="contained"
          href={`tournament/${slug}`}
        >
          Details
        </Button>
        {results && (
          <Button
            as="a"
            round
            color="primary"
            variant="contained"
            href={results}
          >
            Results
          </Button>
        )}
      </div>
    </div>
  );
};
