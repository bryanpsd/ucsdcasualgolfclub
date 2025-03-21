import * as Dialog from '@radix-ui/react-dialog';
import CloseCancelIcon from '../../icons/close_cancel.svg?react';

import * as styles from './Sheet.css';
import type { ReactNode } from 'react';
import { SvgIcon } from '~components/SvgIcon';
import { Typography } from '~components/Typography';
import { Button } from '~components/Button';

export interface SheetProps
  extends Pick<Dialog.DialogProps, 'open' | 'onOpenChange'> {
  /** Element that opens modal.
   *
   * **Note:** This element **needs** to be able to accept a `ref` prop so focus can be
   * returned to this element when the modal is closed for accessibility.
   */
  trigger: ReactNode;
  onConfirm?: () => void;
  children: ReactNode;
  title: string;
}

export const Sheet = ({
  open,
  trigger,
  onOpenChange,
  children,
  title,
}: SheetProps) => {
  return (
    <Dialog.Root modal open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay} />
        <Dialog.Content
          className={styles.modalContent}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <div className={styles.modalCloseContainer}>
            <Dialog.Close asChild>
              <Button variant="text" size="small">
                <Typography>
                  <span className="sr-only">Close</span>
                  <SvgIcon>
                    <CloseCancelIcon />
                  </SvgIcon>
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
