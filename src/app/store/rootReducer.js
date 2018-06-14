import { combineReducers } from 'redux';

import fontsReducer from '~/app/reducers/fonts';
import optionsReducer from '~/app/reducers/options';
import passwordsReducer from '~/app/reducers/passwords';
import presetsReducer from '~/app/reducers/presets';
import tooltipsReducer from '~/app/reducers/tooltips';

export default combineReducers({
  fonts: fontsReducer,
  options: optionsReducer,
  passwords: passwordsReducer,
  presets: presetsReducer,
  tooltips: tooltipsReducer
});