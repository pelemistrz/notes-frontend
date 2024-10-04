import React from "react";
import ReactDOM from "react-dom/client";
import "./public/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App/App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
