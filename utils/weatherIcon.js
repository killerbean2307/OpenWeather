import React, { Component } from "react";
import weatherAsset from "../weather_asset";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const renderWeatherIcon = (condition, size) => {
  let weather = weatherAsset.filter((item, index) => {
    return item.condition == condition;
  });

  return (
    <FontAwesome5
      name={weather[0].name}
      size={size}
      color={weather[0].color}
      solid
    />
  );
};
