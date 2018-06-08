import { combineReducers } from 'redux';

import fontsReducer from '../reducers/fonts';
import optionsReducer from '../reducers/options';
import passwordsReducer from '../reducers/passwords';
import presetsReducer from '../reducers/presets';
import tooltipsReducer from '../reducers/tooltips';

export default combineReducers({
  fonts: fontsReducer,
  options: optionsReducer,
  passwords: passwordsReducer,
  presets: presetsReducer,
  tooltips: tooltipsReducer
});