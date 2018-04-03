import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import 'modern-normalize/modern-normalize.css';
import './styles/main.sass';

import configureStore from './app/configureStore';
import reducer from './app/reducers';
const store = configureStore();

import App from './app/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />  
      </Provider>
    </AppContainer>,
    document.querySelector('#app'));
}

render(App);

if (module.hot) {
  module.hot.accept('./app/App', () => render(require('./app/App').default));
  module.hot.accept('./app/reducers', () => store.replaceReducer(reducer));
}