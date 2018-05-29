import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';

import 'modern-normalize/modern-normalize.css';
import './styles/main.sass';

import configureStore from './app/configureStore';
const store = configureStore();

import { FONTS_LOADED } from './actions/constants';
WebFont.load({
  active: () => {
    store.dispatch({ type: FONTS_LOADED });
  },
  google: {
    families: ['Roboto:400,500', 'Inconsolata']
  },
  classes: false
});

import App from './components/App';

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
  module.hot.accept('./components/App', () => {
    render(require('./components/App').default);
  });
}