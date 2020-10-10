import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import * as serviceWorker from "./serviceWorker";
// import "mdbreact/dist/css/mdb.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
