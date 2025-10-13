import type React from "react";
import { FaWalking } from "react-icons/fa";
import { GiGolfTee } from "react-icons/gi";
import { ResponsiveHeadline } from "~components/ResponsiveHeadline";
import Cart from "~icons/golf_cart.svg?react";
import * as styles from "./CourseInclusions.css";

interface Tournament {
	inclusions: string[];
}

export const CourseInclusions = ({
	tournament,
	isMiniCard,
}: {
	tournament: Tournament;
	isMiniCard?: boolean;
}) => {
	const inclusionIcons: Record<string, React.ElementType> = {
		Cart: Cart,
		"Range Balls": GiGolfTee,
		Walking: FaWalking,
	};

	return (
		<div
			className={styles.courseInclusionsWrapper({
				variant: isMiniCard ? "secondary" : "default",
			})}
		>
			<ResponsiveHeadline
				size={1}
				as="h3"
				className={styles.courseInclusionsWrapper({
					variant: isMiniCard ? "secondary" : "default",
				})}
			>
				Inclusions:
			</ResponsiveHeadline>
			<ul
				className={styles.courseInclusionsList({
					variant: isMiniCard ? "secondary" : "default",
				})}
			>
				{tournament.inclusions.map((inclusion) => {
					const [key, value] = inclusion.split(":").map((item) => item.trim());
					const Icon = inclusionIcons[key];

					return (
						<li
							className={styles.courseInclusionsListItem({
								variant: isMiniCard ? "secondary" : "default",
							})}
							key={inclusion}
						>
							{Icon ? (
								<>
									{Icon === GiGolfTee || Icon === FaWalking ? (
										<Icon
											size={28}
											className={styles.courseInclusionsIcon({
												variant: isMiniCard ? "secondary" : "default",
											})}
											aria-hidden="true"
										/>
									) : (
										<Icon
											className={styles.courseInclusionsIcon({
												variant: isMiniCard ? "secondary" : "default",
											})}
											height={30}
											width={30}
											aria-hidden="true"
										/>
									)}
									<span className="sr-only">{inclusion}</span>
									{value && <span>{value}</span>}
								</>
							) : (
								<span>{inclusion}</span>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
