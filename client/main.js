// This file simply renders the top-level entry React component in the div element in the HTML document:
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (module.hot) {
  // Accept hot update
  module.hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
