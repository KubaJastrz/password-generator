import {
  SET_TOOLTIP_TEXT
} from './constants';

export const setTooltipText = (key, text) => ({
  type: SET_TOOLTIP_TEXT,
  payload: {
    [key]: {
      show: text.length === 0 ? false : true,
      text
    }
  }
});