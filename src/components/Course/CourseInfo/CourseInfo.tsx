import { ResponsiveHeadline } from "~components/ResponsiveHeadline";

import * as styles from "./CourseInfo.css";

interface Props {
  coursePar?: string;
  tees?: string[];
}

export const CourseInfo = (props: Props) => {
  const { coursePar, tees } = props;

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
          <li>Par: {coursePar}</li>
          {tees?.map((tee, index) => (
            <li key={index}>{tee}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
