import type { Player } from "../Results/Results";
import * as styles from "./Stats.css";

type StatsProps = {
	player?: Player;
};

export const Stats: React.FC<StatsProps> = ({ player }) => {
	if (!player) {
		return <p>No player data available.</p>;
	}

	return (
		<div className={styles.statsWrapper}>
			<dl className={styles.statsCardWrapper}>
				<div className={styles.statsCard}>
					<dt>Index</dt>
					<dd className={styles.statValue}>{player.handicapIndex ?? "N/A"}</dd>
				</div>
				<div className={styles.statsCard}>
					<dt>Gross</dt>
					<dd className={styles.statValue}>{player.gross ?? "N/A"}</dd>
				</div>
				<div className={styles.statsCard}>
					<dt>Net</dt>
					<dd className={styles.statValue}>{player.net ?? "N/A"}</dd>
				</div>
			</dl>
		</div>
	);
};
