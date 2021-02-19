import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import App from "./app/layout//App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import {createBrowserHistory} from "history";
import ScrollToTop from "./app/layout/ScrollToTop";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
