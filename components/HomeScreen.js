import React, { Component } from "react";
import { Button, Text } from "react-native-elements";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  StatusBar
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import CurrentWeather from "./CurrentWeather";
import DetailWeather from "./DetailWeather";
import Forecast from "./Forecast";
import weatherAsset from "../weather_asset";
import { getCurrentWeather, getForecast } from "../actions";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentWeather();
    this.props.getForecast();
  }

  getBackgroundColor = condition => {
    let weather = weatherAsset.filter((item, index) => {
      return item.condition == condition;
    });
    return weather[0].backgroundColor;
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: this.props.currentWeather.data
              ? this.getBackgroundColor(
                  this.props.currentWeather.data.weather[0].icon
                )
              : "white"
          }
        ]}
      >
        <StatusBar hidden />

        {this.props.currentWeather.data && this.props.forecast.data && (
          <View style={{ flex: 1 }}>
            <CurrentWeather />
            <Forecast />
            <DetailWeather />
            <Button
              raised
              title="Find Another Location"
              onPress={() => {
                this.props.navigation.navigate("SearchLocation");
              }}
              containerStyle={styles.button}
              icon={
                <FontAwesome
                  name="search"
                  color="white"
                  size={20}
                  style={{ paddingRight: 5 }}
                />
              }
            />
          </View>
        )}
        {!this.props.currentWeather.data ||
          (!this.props.forecast.data && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ))}

        {this.props.currentWeather.error && this.props.forecast.error && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>
              {this.props.currentWeather.error.response.data.message ||
                this.props.forecast.error.response.data.message}
            </Text>
            <Button
              raised
              title="Find another location"
              onPress={() => {
                this.props.navigation.navigate("SearchLocation");
              }}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  button: {
    margin: 5
  }
});

const mapStateToProps = state => {
  return {
    location: state.location,
    currentWeather: state.currentWeather,
    forecast: state.forecast
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentWeather: () => {
      dispatch(getCurrentWeather());
    },
    getForecast: () => {
      dispatch(getForecast());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
