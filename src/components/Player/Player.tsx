import { useEffect, useId, useState } from "react";
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

	// Update page metadata when player changes
	useEffect(() => {
		if (typeof window === "undefined") return;

		const isOnRoster = currentPlayer?.onCurrentRoster ?? false;

		// Update hero title
		const heroHeadline = document.querySelector("h1");
		if (heroHeadline) {
			heroHeadline.textContent = `${selectedPlayer} ${isOnRoster ? "Stats & " : ""}Results`;
		}

		// Update document title
		document.title = `${selectedPlayer} ${isOnRoster ? "Stats & " : ""}Results | UCSD Casual Golf Club`;

		// Update meta description
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) {
			metaDescription.setAttribute(
				"content",
				`View ${selectedPlayer}'s tournament results, scores, and performance history with the UCSD Casual Golf Club.`,
			);
		}
	}, [selectedPlayer, currentPlayer]);

	const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const playerName = event.target.value;
		setSelectedPlayer(playerName);

		// Update URL with selected player
		const url = new URL(window.location.href);
		if (playerName) {
			url.searchParams.set("playerName", playerName);
			trackPlayerSelect(playerName);
		} else {
			url.searchParams.delete("playerName");
		}
		window.history.pushState({}, "", url);
	};

	return (
		<div className={styles.playerWrapper}>
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
			</div>
			{selectedPlayer && currentPlayer && (
				<div className={styles.playerWrapper}>
					{currentPlayer.onCurrentRoster && <Stats player={currentPlayer} />}
					<Results players={players} selectedPlayer={selectedPlayer} />
				</div>
			)}
		</div>
	);
};
