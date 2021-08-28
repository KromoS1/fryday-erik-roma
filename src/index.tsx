import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./app/Store";
import {HashRouter} from 'react-router-dom';
import {App} from "./app/App";

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
