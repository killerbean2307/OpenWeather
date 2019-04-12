import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Text, Card } from "react-native-elements";
import { connect } from "react-redux";
import { getForecast } from "../actions";
import { renderWeatherIcon } from "../utils/weatherIcon";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";

const screenHeight = Dimensions.get("screen").height;

class Forecast extends Component {
  renderItem = ({ item, index }) => {
    return (
      <View style={styles.listItem} key={`forecast_${item.dt}`}>
        <LinearGradient
          colors={["#48c6ef", "#6f86d6"]}
          style={{
            flex: 1,
            borderRadius: 5,
            justifyContent: "center",
            paddingHorizontal: 10,
            elevation: 1
          }}
        >
          <View style={{ alignSelf: "center" }}>
            {renderWeatherIcon(item.weather[0].icon, 20)}
          </View>
          <Text style={{ color: "white", fontWeight: "500" }}>
            {Math.round(item.main.temp)} <Text>{`\u2103`}</Text>
          </Text>
          <Text style={{ color: "white", textAlign: "center" }}>
            {moment.unix(item.dt).format("HH:mm")}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  render() {
    console.log(this.props.forecast.data);
    return (
      <View colors={["#3b5998", "#192f6a", "#3b5998"]} style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {!this.props.forecast.data && !this.props.forecast.error && (
            <ActivityIndicator size="large" />
          )}

          {this.props.forecast.data && (
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: 25,
                  color: "white",
                  paddingBottom: 10
                }}
              >
                24h Forecast
              </Text>
              <FlatList
                style={{ margin: 0 }}
                horizontal={true}
                data={this.props.forecast.data.list.filter((item, index) => {
                  return index < 9;
                })}
                keyExtractor={item => {
                  item.dt;
                }}
                renderItem={this.renderItem}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
          {this.props.forecast.error && (
            <Text>{this.props.forecast.error.response.message}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight / 3.5,
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  listItem: {
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    padding: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    borderColor: "transparent",
    borderWidth: 0
  }
});

const mapStateToProps = state => {
  return {
    forecast: state.forecast
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getForecast: () => {
      dispatch(getForecast());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forecast);
