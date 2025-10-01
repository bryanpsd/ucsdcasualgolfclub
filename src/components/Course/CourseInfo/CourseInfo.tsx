import { ResponsiveHeadline } from "~components/ResponsiveHeadline"

import * as styles from "./CourseInfo.css"

interface Props {
	coursePar?: string
	tees?: string[]
}

export const CourseInfo = (props: Props) => {
	const { coursePar, tees } = props

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
				<div className={styles.courseCardInfoContent}>
					<h3>Par: {coursePar}</h3>
					<h3>Tees:</h3>
					{tees?.map((tee) => (
						<p key={tee}>{tee}</p>
					))}
				</div>
			</div>
		</div>
	)
}
