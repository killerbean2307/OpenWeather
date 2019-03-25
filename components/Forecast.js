import React, { Component } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Text, Card } from "react-native-elements";
import { connect } from "react-redux";
import { getForecast } from "../actions";
import { renderWeatherIcon } from "../utils/weatherIcon";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";

class Forecast extends Component {
  renderItem = ({ item }) => {
    return (
      <Card containerStyle={styles.listItem} key={item.dt}>
        <LinearGradient
          colors={["#6a93e4", "#4379e3", "#2969e6"]}
          style={{ flex: 1, borderRadius: 5, justifyContent: "center", paddingHorizontal: 10 }}
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
      </Card>
    );
  };

  render() {
    return (
      <View
        colors={["#3b5998","#192f6a", "#3b5998"]}
        style={styles.container}
      >
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
                  fontWeight: "bold",
                  fontSize: 25,
                  color: "white"
                }}
              >
                24h Forecast
              </Text>
              <FlatList
                style={{ margin: 0 }}
                horizontal={true}
                data={this.props.forecast.data.list.splice(0, 9)}
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
    width: "100%",
    height: 185,
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
    marginTop: 30,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  listItem: {
    borderRadius: 5,
    flex:1,
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    padding: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    borderColor: "transparent"
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
