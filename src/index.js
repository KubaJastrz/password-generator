import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';

import 'focus-visible';
import 'modern-normalize/modern-normalize.css';
import '~/styles/main.sass';

import configureStore from '~/app/store/configureStore';
import storeListener from '~/app/store/storeListener';
import { FONTS_LOADED } from '~/actions/constants';
import App from '~/app/layout/App';

const store = configureStore();
store.subscribe(() => storeListener(store));

WebFont.load({
  active: () => {
    store.dispatch({ type: FONTS_LOADED });
  },
  google: {
    families: ['Roboto:400,500', 'Inconsolata']
  },
  classes: false
});

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />  
      </Provider>
    </AppContainer>,
    document.querySelector('#app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('~/app/layout/App', () => {
    render(require('~/app/layout/App').default);
  });
}