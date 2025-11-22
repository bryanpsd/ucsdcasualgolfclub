import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { CgClose } from "react-icons/cg";
import { Button } from "~components/Button";
import { Typography } from "~components/Typography";

import * as styles from "./Sheet.css";

export interface SheetProps extends Pick<Dialog.DialogProps, "open" | "onOpenChange"> {
	trigger: ReactNode;
	onConfirm?: () => void;
	children: ReactNode;
	title: string;
}

export const Sheet = ({ open, trigger, onOpenChange, children, title }: SheetProps) => {
	return (
		<Dialog.Root modal open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.modalOverlay} />
				<Dialog.Content className={styles.modalContent} aria-describedby={undefined}>
					<Dialog.Title className="sr-only">{title}</Dialog.Title>
					<div className={styles.modalCloseContainer}>
						<Dialog.Close asChild>
							<Button
								color="default"
								variant="text"
								size="small"
								track={true}
								trackLabel="Close Sheet"
								trackCategory="sheet"
							>
								<Typography>
									<span className="sr-only">Close</span>
									<CgClose className={styles.closeIcon} />
								</Typography>
							</Button>
						</Dialog.Close>
					</div>
					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
