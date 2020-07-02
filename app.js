import React from "react";
import ReactDOM from "react-dom";
import App from "./src/components/AppRoutes";
import "./app.scss";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers/";

const middleWare = applyMiddleware(thunk);
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById("app")
);
