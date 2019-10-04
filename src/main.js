import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import store from "~s";
import {BrowserRouter as Router,} from "react-router-dom";
render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
