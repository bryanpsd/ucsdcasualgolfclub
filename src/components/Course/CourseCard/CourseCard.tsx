import { ResponsiveHeadline } from '~components/ResponsiveHeadline';
import { Button } from '../../Button/Button';
import type { TypeCourseProps } from '../../../types/contentful';
import { format } from 'date-fns';

import * as styles from './CourseCard.css';
import { Typography } from '~components/Typography';
import Clock from '../../../icons/clock.svg?react';
import Players from '../../../icons/players.svg?react';
import GolfBall from '../../../icons/golf_ball.svg?react';
import Cart from '../../../icons/golf_cart.svg?react';
import { concatClasses } from '~utils/concatClasses';

interface CourseCardProps extends TypeCourseProps {
  hideCourseInfo?: boolean;
}

export const CourseCard = (props: CourseCardProps) => {
  const {
    date,
    notes,
    course,
    price,
    players,
    slug,
    results,
    amenities,
    hideCourseInfo,
  } = props;
  const isWednesday = date && new Date(date).getDay() === 3;
  const amenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Balls':
        return <GolfBall height={30} width={30} aria-hidden="true" />;
      case 'Cart':
        return <Cart height={30} width={30} aria-hidden="true" />;
      default:
        return null;
    }
  };
  return (
    <section className={styles.courseCardWrapper}>
      {date && (
        <div
          className={styles.dateWrapper({
            variant: isWednesday ? 'secondary' : 'default',
          })}
        >
          <Typography color="inverse">
            {date && format(new Date(date), 'MMM')}
          </Typography>
          <Typography color="inverse" variant="headlineLg">
            {date && format(new Date(date), 'd')}
          </Typography>
          <Typography color="inverse">
            {date && format(new Date(date), 'E')}
          </Typography>
        </div>
      )}
      {hideCourseInfo ? (
        <div className={styles.courseCardNameWrapper}>
          <ResponsiveHeadline size={2} as="h2">
            {course}
          </ResponsiveHeadline>
          {notes && (
            <ResponsiveHeadline className={styles.courseNote} size={1} as="h2">
              {notes}
            </ResponsiveHeadline>
          )}
        </div>
      ) : (
        <div className={styles.courseCardInfo}>
          <div>
            <ResponsiveHeadline size={1} as="h2">
              {course}
            </ResponsiveHeadline>
            {notes && (
              <ResponsiveHeadline
                className={styles.courseNote}
                size={1}
                as="h2"
              >
                {notes}
              </ResponsiveHeadline>
            )}
          </div>
          <div className={styles.courseCardTime}>
            <Clock height={30} width={30} aria-hidden="true" />
            {date && format(new Date(date), 'h:mmaaa')}
          </div>
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
            {amenities?.map((amenity) => (
              <li key={amenity} className={styles.courseCardListItem}>
                {amenityIcon(amenity)}
                <span className="sr-only">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.courseCardButtons}>
        <div className={styles.courseCardButtonsWrapper}>
          <Button
            as="a"
            color="primary"
            size="small"
            variant="outlined"
            href={`/tournament-schedule/${format(
              new Date((date ?? '').toString()),
              'yyyy'
            )}/${slug}`}
          >
            Details
          </Button>
          {results && (
            <Button
              as="a"
              color="primary"
              size="small"
              variant="outlined"
              target="_blank"
              rel="noopener noreferrer"
              href={
                typeof results === 'object' && results?.fields?.file?.url
                  ? results.fields.file.url
                  : undefined
              }
            >
              Results
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
