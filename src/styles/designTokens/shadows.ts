import { alphaToHex } from '../../utils/alphaToHex';
import { color } from './colors';

const { grayscale } = color;

// MUI Reference Shadows
const muiShadows = {
  0: 'none',
  1: `0px 2px 1px -1px ${grayscale.shadow1},0px 1px 1px 0px ${grayscale.shadow2},0px 1px 3px 0px ${grayscale.shadow3}`,
  2: `0px 3px 1px -2px ${grayscale.shadow1},0px 2px 2px 0px ${grayscale.shadow2},0px 1px 5px 0px ${grayscale.shadow3}`,
  3: `0px 3px 3px -2px ${grayscale.shadow1},0px 3px 4px 0px ${grayscale.shadow2},0px 1px 8px 0px ${grayscale.shadow3}`,
  4: `0px 2px 4px -1px ${grayscale.shadow1},0px 4px 5px 0px ${grayscale.shadow2},0px 1px 10px 0px ${grayscale.shadow3}`,
  5: `0px 3px 5px -1px ${grayscale.shadow1},0px 5px 8px 0px ${grayscale.shadow2},0px 1px 14px 0px ${grayscale.shadow3}`,
  6: `0px 3px 5px -1px ${grayscale.shadow1},0px 6px 10px 0px ${grayscale.shadow2},0px 1px 18px 0px ${grayscale.shadow3}`,
  7: `0px 4px 5px -2px ${grayscale.shadow1},0px 7px 10px 1px ${grayscale.shadow2},0px 2px 16px 1px ${grayscale.shadow3}`,
  8: `0px 5px 5px -3px ${grayscale.shadow1},0px 8px 10px 1px ${grayscale.shadow2},0px 3px 14px 2px ${grayscale.shadow3}`,
  9: `0px 5px 6px -3px ${grayscale.shadow1},0px 9px 12px 1px ${grayscale.shadow2},0px 3px 16px 2px ${grayscale.shadow3}`,
  10: `0px 6px 6px -3px ${grayscale.shadow1},0px 10px 14px 1px ${grayscale.shadow2},0px 4px 18px 3px ${grayscale.shadow3}`,
  11: `0px 6px 7px -4px ${grayscale.shadow1},0px 11px 15px 1px ${grayscale.shadow2},0px 4px 20px 3px ${grayscale.shadow3}`,
  12: `0px 7px 8px -4px ${grayscale.shadow1},0px 12px 17px 2px ${grayscale.shadow2},0px 5px 22px 4px ${grayscale.shadow3}`,
  13: `0px 7px 8px -4px ${grayscale.shadow1},0px 13px 19px 2px ${grayscale.shadow2},0px 5px 24px 4px ${grayscale.shadow3}`,
  14: `0px 7px 9px -4px ${grayscale.shadow1},0px 14px 21px 2px ${grayscale.shadow2},0px 5px 26px 4px ${grayscale.shadow3}`,
  15: `0px 8px 9px -5px ${grayscale.shadow1},0px 15px 22px 2px ${grayscale.shadow2},0px 6px 28px 5px ${grayscale.shadow3}`,
  16: `0px 8px 10px -5px ${grayscale.shadow1},0px 16px 24px 2px ${grayscale.shadow2},0px 6px 30px 5px ${grayscale.shadow3}`,
  17: `0px 8px 11px -5px ${grayscale.shadow1},0px 17px 26px 2px ${grayscale.shadow2},0px 6px 32px 5px ${grayscale.shadow3}`,
  18: `0px 9px 11px -5px ${grayscale.shadow1},0px 18px 28px 2px ${grayscale.shadow2},0px 7px 34px 6px ${grayscale.shadow3}`,
  19: `0px 9px 12px -6px ${grayscale.shadow1},0px 19px 29px 2px ${grayscale.shadow2},0px 7px 36px 6px ${grayscale.shadow3}`,
  20: `0px 10px 13px -6px ${grayscale.shadow1},0px 20px 31px 3px ${grayscale.shadow2},0px 8px 38px 7px ${grayscale.shadow3}`,
  21: `0px 10px 13px -6px ${grayscale.shadow1},0px 21px 33px 3px ${grayscale.shadow2},0px 8px 40px 7px ${grayscale.shadow3}`,
  22: `0px 10px 14px -6px ${grayscale.shadow1},0px 22px 35px 3px ${grayscale.shadow2},0px 8px 42px 7px ${grayscale.shadow3}`,
  23: `0px 11px 14px -7px ${grayscale.shadow1},0px 23px 36px 3px ${grayscale.shadow2},0px 9px 44px 8px ${grayscale.shadow3}`,
  24: `0px 11px 15px -7px ${grayscale.shadow1},0px 24px 38px 3px ${grayscale.shadow2},0px 9px 46px 8px ${grayscale.shadow3}`,
} as const;

export const boxShadow = {
  none: 'none',
  header: `.2rem .2rem .2rem ${grayscale['black']}${alphaToHex(50)}`, // SSP Header shadow
  drawer: `0 0 .8rem ${grayscale.black}${alphaToHex(20)}`, // Brix Drawer
  floatingContainer: `0 0 2.4rem ${grayscale.black}${alphaToHex(20)}`, // Brix Floating Container
  floatingActionButton: `0 .4rem 1.2rem ${grayscale.black}${alphaToHex(40)}`, // Brix Floating Action Button
  card: `0 .2rem .3rem 0 ${grayscale.black}${alphaToHex(5)}`, // Brix Card
  dialog: `0px 11px 14px -7px ${grayscale.shadow1},0px 23px 36px 3 ${grayscale.shadow2}),0px 9px 44px 8px ${grayscale.shadow3})`,
  popover: `0px 4px 12px 0px ${grayscale.black}1A`,
  accordion: `0 .2rem .4rem -0.2rem  ${grayscale.shadow4}`,
  ...muiShadows,
} as const;
