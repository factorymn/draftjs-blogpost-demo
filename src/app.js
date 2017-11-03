import { render, unmountComponentAtNode } from 'react-dom';
import React, { Component } from 'react';
import { AppContainer } from 'react-hot-loader';

const mountedNode = document.getElementById('app');

const renderApp = () => {
  const App = require('./components/App/App').default;

  render((
    <AppContainer>
      <App />
    </AppContainer>
  ), mountedNode);
};

if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      console.error('render app crash ==>', error);
    }
  };

  module.hot.accept('./components/App/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountedNode);

      reRenderApp();
    });
  });
}

renderApp();
