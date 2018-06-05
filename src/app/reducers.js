import { combineReducers } from 'redux';

import configReducer from '../reducers/config';
import fontsReducer from '../reducers/fonts';
import optionsReducer from '../reducers/options';
import presetsReducer from '../reducers/presets';
import tooltipsReducer from '../reducers/tooltips';

export default combineReducers({
  config: configReducer,
  fonts: fontsReducer,
  options: optionsReducer,
  presets: presetsReducer,
  tooltips: tooltipsReducer
});