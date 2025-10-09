import { format } from "date-fns";
import { Button } from "~components/Button/Button";
import { ResponsiveHeadline } from "~components/ResponsiveHeadline";
import { Typography } from "~components/Typography";
import Clock from "~icons/clock.svg?react";
import type { TypeCourseProps } from "~types/contentful";
import { CourseDetails } from "../CourseDetails";

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
	type?: string;
	tournamentNotes?: string[];
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
		type,
		clubChampionship,
		tournamentNotes,
	} = props;

	const isWednesday = date && new Date(date).getDay() === 3;
	const isSaturday = date && new Date(date).getDay() === 6;
	const isSpecialEvent = date && !isWednesday && !isSaturday;

	return (
		<section className={styles.courseCardWrapper}>
			{date && (
				<div
					className={styles.dateWrapper({
						variant: isSpecialEvent ? "special" : isWednesday ? "secondary" : "default",
					})}
				>
					<Typography color={isSpecialEvent ? "primary" : "inverse"}>
						{format(date, "MMM")}
					</Typography>
					<Typography color={isSpecialEvent ? "primary" : "inverse"} variant="headlineLg">
						{format(date, "d")}
					</Typography>
					<Typography color={isSpecialEvent ? "primary" : "inverse"}>
						{format(date, "E")}
					</Typography>
				</div>
			)}
			{hideCourseInfo ? (
				<div className={styles.courseCardNameWrapper}>
					<ResponsiveHeadline size={2} as="h2">
						{course}
					</ResponsiveHeadline>
					{tournamentNotes && tournamentNotes.length > 0 && (
						<div>
							{tournamentNotes.map((note) => (
								<ResponsiveHeadline className={styles.courseNote} key={note} size={1} as="h3">
									{note}
								</ResponsiveHeadline>
							))}
						</div>
					)}
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
						{tournamentNotes && tournamentNotes.length > 0 && (
							<div>
								{tournamentNotes.map((note) => (
									<ResponsiveHeadline className={styles.courseNote} key={note} size={1} as="h3">
										{note}
									</ResponsiveHeadline>
								))}
							</div>
						)}
						{clubChampionship && (
							<ResponsiveHeadline className={styles.courseNote} size={1} as="h2">
								Club Championship
							</ResponsiveHeadline>
						)}
					</div>
					<div className={styles.courseCardTimeType}>
						<Clock height={30} width={30} aria-hidden="true" />
						{date && format(date, "h:mmaaa")}{" "}
						{type && (
							<Typography color="text" variant="bodyLg">
								{type}
							</Typography>
						)}
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
