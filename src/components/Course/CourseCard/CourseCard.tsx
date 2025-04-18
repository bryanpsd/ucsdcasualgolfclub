import { ResponsiveHeadline } from '~components/ResponsiveHeadline';
import { Button } from '../../Button/Button';
import type { TypeCourseProps } from '../../../types/contentful';
import { format } from 'date-fns';

import { Typography } from '~components/Typography';
import Clock from '../../../icons/clock.svg?react';
import { CourseInfo } from '../CourseInfo/CourseInfo';

import * as styles from './CourseCard.css';

interface CourseCardProps extends TypeCourseProps {
  hideCourseInfo?: boolean;
  date?: string;
  players?: number;
  price?: number;
  amenities?: string[];
  results?: string | null | undefined;
  clubChampionship?: boolean;
}

export const CourseCard = (props: CourseCardProps) => {
  const {
    course,
    slug,
    hideCourseInfo,
    tournaments,
    players,
    price,
    amenities,
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
            variant: isWednesday ? 'secondary' : 'default',
          })}
        >
          <Typography color="inverse">{format(date, 'MMM')}</Typography>
          <Typography color="inverse" variant="headlineLg">
            {format(date, 'd')}
          </Typography>
          <Typography color="inverse">{format(date, 'E')}</Typography>
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
            <ResponsiveHeadline size={1} as="h2">
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
            {date && format(date, 'h:mmaaa')}
          </div>
          <CourseInfo
            amenities={amenities}
            isMiniCard={false}
            price={price ?? 0}
            players={players ?? 0}
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
              variant="outlined"
              href={`/tournaments/${format(date, 'yyyy')}/${slug}`}
            >
              Details
            </Button>
          )}
          {results && results !== null && results !== undefined && (
            <Button
              as="a"
              color="primary"
              size="small"
              variant="outlined"
              target="_blank"
              rel="noopener noreferrer"
              href={results} // Use the results file URL
            >
              Results
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
