import { ResponsiveHeadline } from '~components/ResponsiveHeadline';

import * as styles from './CourseInfo.css';

interface Props {
  coursePar?: number;
  mensTees?: string;
  womensTees?: string;
}

export const CourseInfo = (props: Props) => {
  const { coursePar, mensTees, womensTees } = props;

  return (
    <div className={styles.courseCardInfo}>
      <ResponsiveHeadline
        className={styles.courseCardInfoTitle}
        size={1}
        as="h2"
      >
        Information
      </ResponsiveHeadline>
      <div className={styles.courseCardInfoListWrapper}>
        <ul className={styles.courseCardInfoList}>
          <li>Par {coursePar}</li>
          <li>Men {mensTees}</li>
          <li>Women {womensTees}</li>
        </ul>
      </div>
    </div>
  );
};
