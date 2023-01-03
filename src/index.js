import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Globalstyle from 'GlobalStyle';
import { Provider } from 'react-redux';
import { store } from 'store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Globalstyle />
      <App />
    </Provider>
  </React.StrictMode>
);
