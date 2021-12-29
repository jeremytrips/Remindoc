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
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

AppRegistry.registerComponent(appName, () => () => {
    let persistor = persistStore(store);   

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
});
