import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import App from "./App";

console.log(process.env.HOST);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
