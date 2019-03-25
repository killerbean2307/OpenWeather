import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "./components/SplashScreen";
import SearchLocationScreen from "./components/SearchLocationScreen";
import HomeScreen from "./components/HomeScreen";

const switchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    SearchLocation: SearchLocationScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: "Splash"
  }
);

const appContainer = createAppContainer(switchNavigator);
export default appContainer;
