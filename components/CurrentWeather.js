import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import { getCurrentWeather } from "../actions";
import { renderWeatherIcon } from "../utils/weatherIcon";

class CurrentWeather extends Component {
  render() {
    return (
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {renderWeatherIcon(this.props.currentWeather.data.weather[0].icon, 100)}
        <Text style={{ fontSize: 65, color: "white", fontWeight: "bold" }}>
          {this.props.currentWeather.data.main.temp}
          <Text>{`\u2103`}</Text>
        </Text>
        <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
          {this.props.currentWeather.data.name}
        </Text>
        <Text style={{ color: "white" }}>
          {this.props.currentWeather.data.weather[0].description.replace(
            /\b\w/g,
            l => l.toUpperCase()
          )}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.location,
    currentWeather: state.currentWeather
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentWeather: () => {
      dispatch(getCurrentWeather());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentWeather);
