import { useId, useState } from "react";
import { trackPlayerSelect } from "~/utils/analytics";
import * as styles from "./Player.css";
import { Results } from "./Results";
import type { Player as PlayerType } from "./Results/Results";
import { Stats } from "./Stats";

type PlayerProps = {
	players: PlayerType[];
	initialSelectedPlayer?: string;
};

export const Player: React.FC<PlayerProps> = ({ players, initialSelectedPlayer = "" }) => {
	const [selectedPlayer, setSelectedPlayer] = useState(initialSelectedPlayer);
	const selectId = useId();

	const sortedPlayers = players.slice().sort((a, b) => a.playerName.localeCompare(b.playerName));

	const currentPlayer = players.find((p) => p.playerName === selectedPlayer);

	const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const playerName = event.target.value;
		setSelectedPlayer(playerName);

		if (playerName) {
			trackPlayerSelect(playerName);
		}
	};

	return (
		<div>
			<select
				id={selectId}
				value={selectedPlayer}
				onChange={handlePlayerChange}
				className={styles.select}
			>
				<option value="">Select a Player</option>
				{sortedPlayers.map((player) => (
					<option key={player.playerName} value={player.playerName}>
						{player.playerName}
					</option>
				))}
			</select>

			{selectedPlayer && currentPlayer && (
				<div className={styles.playerWrapper}>
					<Stats player={currentPlayer} />
					<Results players={players} selectedPlayer={selectedPlayer} />
				</div>
			)}
		</div>
	);
};
