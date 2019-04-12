/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import Navigator from "./Navigator";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootSaga from "./sagas/RootSaga";
import rootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { BackHandler, ToastAndroid } from "react-native";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backPress: 0
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.setState(prev => {
      return {
        backPress: prev.backPress + 1
      };
    });
    if (this.state.backPress === 2) {
      BackHandler.exitApp();
    }

    ToastAndroid.show("Press back button again to exit app", ToastAndroid.SHORT);

    setTimeout(() => {
      this.setState({ backPress: 0 });
    }, 2000);

    console.log(this.state.backPress);
    return true;
  };

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

sagaMiddleware.run(rootSaga);
