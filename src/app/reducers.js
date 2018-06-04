import { combineReducers } from 'redux';

import configReducer from '../reducers/config';
import optionsReducer from '../reducers/options';
import tooltipsReducer from '../reducers/tooltips';
import fontsReducer from '../reducers/fonts';

export default combineReducers({
  config: configReducer,
  options: optionsReducer,
  tooltips: tooltipsReducer,
  fonts: fontsReducer
});