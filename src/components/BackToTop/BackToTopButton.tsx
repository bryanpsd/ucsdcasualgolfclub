// Floating button that appears after scrolling 300px down and returns the user to the top.
// Also clears any URL hash to restore the clean page URL.

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import * as styles from "~/components/BackToTop/BackToTopButton.css";
import { Button } from "~/components/Button";

export const BackToTopButton = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll); // cleanup on unmount
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (window.location.hash) {
			history.replaceState(null, "", window.location.pathname + window.location.search);
		}
	};

	if (!visible) return null;

	return (
		<Button
			type="button"
			track
			trackLabel="Back to Top Button"
			color="primary"
			variant="round"
			className={styles.backToTopButton}
			aria-label="Back to top"
			onClick={scrollToTop}
		>
			<FiArrowUp
				size={48}
				className={styles.backToTopButtonIcon}
				aria-hidden="true"
				focusable="false"
			/>
		</Button>
	);
};
