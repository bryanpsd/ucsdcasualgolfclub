import { format } from "date-fns";

import { ResponsiveHeadline } from "~components/ResponsiveHeadline";
import { Button } from "../../Button/Button";
import { CourseDetails } from "../CourseDetails";
import { Typography } from "~components/Typography";

import Clock from "../../../icons/clock.svg?react";

import type { TypeCourseProps } from "../../../types/contentful";

import * as styles from "./CourseCard.css";

interface CourseCardProps extends TypeCourseProps {
  hideCourseInfo?: boolean;
  date?: string;
  players?: string;
  prices?: string[];
  inclusions?: string[];
  results?: string | null | undefined;
  clubChampionship?: boolean;
  coursePar?: string;
  tees?: string[];
}

export const CourseCard = (props: CourseCardProps) => {
  const {
    course,
    slug,
    hideCourseInfo,
    players,
    prices,
    tees,
    inclusions,
    date,
    results,
    clubChampionship,
  } = props;

  const isWednesday = date && new Date(date).getDay() === 3;

  return (
    <section className={styles.courseCardWrapper}>
      {date && (
        <div
          className={styles.dateWrapper({
            variant: isWednesday ? "secondary" : "default",
          })}
        >
          <Typography color="inverse">{format(date, "MMM")}</Typography>
          <Typography color="inverse" variant="headlineLg">
            {format(date, "d")}
          </Typography>
          <Typography color="inverse">{format(date, "E")}</Typography>
        </div>
      )}
      {hideCourseInfo ? (
        <div className={styles.courseCardNameWrapper}>
          <ResponsiveHeadline size={2} as="h2">
            {course}
          </ResponsiveHeadline>
          {clubChampionship && (
            <ResponsiveHeadline className={styles.courseNote} size={1} as="h2">
              Club Championship
            </ResponsiveHeadline>
          )}
        </div>
      ) : (
        <div className={styles.courseCardInfo}>
          <div>
            <ResponsiveHeadline size={2} as="h2">
              {course}
            </ResponsiveHeadline>
            {clubChampionship && (
              <ResponsiveHeadline
                className={styles.courseNote}
                size={1}
                as="h2"
              >
                Club Championship
              </ResponsiveHeadline>
            )}
          </div>
          <div className={styles.courseCardTime}>
            <Clock height={30} width={30} aria-hidden="true" />
            {date && format(date, "h:mmaaa")}
          </div>
          <CourseDetails
            inclusions={inclusions}
            isMiniCard={false}
            prices={prices}
            players={players || ""}
            tees={tees}
          />
        </div>
      )}

      <div className={styles.courseCardButtons}>
        <div className={styles.courseCardButtonsWrapper}>
          {date && (
            <Button
              as="a"
              color="primary"
              size="small"
              variant="contained"
              href={`/tournaments/${format(date, "yyyy")}/${slug}`}
            >
              Details
            </Button>
          )}
          {results && results !== null && results !== undefined && (
            <Button
              as="a"
              color="primary"
              size="small"
              variant="contained"
              target="_blank"
              rel="noopener noreferrer"
              href={results}
            >
              Results
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
