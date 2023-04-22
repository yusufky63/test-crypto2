import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import CryptoContext from "./redux/CryptoContext";
import {Provider} from "react-redux";

import {store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <CryptoContext>
        <App />
      </CryptoContext>
    </BrowserRouter>
  </Provider>
);
