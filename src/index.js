import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';

import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
); 