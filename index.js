/**
 * @format
 */
import 'intl';
import 'intl/locale-data/jsonp/en';
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { store } from "./src/features/store";
import { Provider } from "react-redux";
import React from "react";

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
