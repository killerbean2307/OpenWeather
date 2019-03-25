import React, { Component } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import degreeToDirection from "../utils/degreeToDirection";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";

class DetailWeather extends Component {
  render() {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "transparent",
          borderRadius: 10,
          backgroundColor: "rgba(0,0,0,0.1)",
          margin: 5
        }}
      >
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: "white"
          }}
        >
          <Text style={{ padding: 10, color: "white", fontWeight: "bold" }}>
            Detail
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 0.5,
            borderColor: "white"
          }}
        >
          <View
            style={[
              styles.weatherInfo,
              { borderRightWidth: 0.5, borderColor: "white" }
            ]}
          >
            <View>
              <Text style={styles.weatherInfoTitleText}>
                {degreeToDirection(this.props.currentWeather.data.wind.deg)}
              </Text>
              <Text style={styles.weatherInfoDetailText}>
                {this.props.currentWeather.data.wind.speed} km/h
              </Text>
            </View>
            <View>
              <FontAwesome name={"wind"} size={20} color="white" />
            </View>
          </View>

          <View style={styles.weatherInfo}>
            <View>
              <Text style={styles.weatherInfoTitleText}>Pressure</Text>
              <Text style={styles.weatherInfoDetailText}>
                {this.props.currentWeather.data.main.pressure} hpA
              </Text>
            </View>
            <View>
              <FontAwesome name={"tachometer-alt"} size={20} color="white" />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.weatherInfo,
              { borderRightWidth: 0.5, borderColor: "white" }
            ]}
          >
            <View>
              <Text style={styles.weatherInfoTitleText}>Humidity</Text>
              <Text style={styles.weatherInfoDetailText}>
                {this.props.currentWeather.data.main.humidity} %
              </Text>
            </View>
            <View>
              <FontAwesome name={"tint"} size={20} color="white" />
            </View>
          </View>

          <View style={styles.weatherInfo}>
            <View>
              <Text style={styles.weatherInfoTitleText}>Cloud</Text>
              <Text style={styles.weatherInfoDetailText}>
                {this.props.currentWeather.data.clouds.all} %
              </Text>
            </View>
            <View>
              <FontAwesome name={"cloud"} size={20} color="white" />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  weatherInfoTitleText: {
    color: "#e0dbdf",
    fontWeight: "bold"
  },
  weatherInfoDetailText: {
    color: "white"
  }
});

const mapStateToProps = state => {
  return {
    currentWeather: state.currentWeather
  };
};

export default connect(mapStateToProps)(DetailWeather);
