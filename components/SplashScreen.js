import React, { Component } from "react";
import { View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { Text } from "react-native-elements";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import { setLocation, getCurrentWeather } from "../actions";

const deviceWidth = Dimensions.get("window").width;

const imageWidth = deviceWidth * 0.5;

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const location = await AsyncStorage.getItem("location");
    await new Promise((resolve, reject) => {setTimeout(resolve, 1000)})
    if (!location) {
      this.props.navigation.navigate("SearchLocation");
    } else {
      this.props.navigation.navigate("Home");
    }
  };

  render() {
    console.log("splash", this.props);
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text h2 style={{ color: "white" }}>
            Open Weather
          </Text>
          <View style={{ width: imageWidth, height: imageWidth }}>
            <LottieView
              source={require("../lotties/4791-foggy.json")}
              autoPlay
              loop
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={styles.loadingText}>
            {this.props.currentWeather.isDone ? "" : "Loading..."}
          </Text>
        </View>
        <Text style={{ fontSize: 10 }}>made with OpenWeatherMap</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002"
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "white"
  }
});

const mapStateToProps = state => {
  return {
    location: state.location,
    currentWeather: state.currentWeather
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    },
    getCurrentWeather: () => {
      dispatch(getCurrentWeather());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
