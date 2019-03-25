import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { SearchBar, Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { setLocation, getCurrentWeather } from "../actions";

class SearchLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      hasLocation: false
    };
    this._checkAsyncStorageHasLocation()
  }

  _checkAsyncStorageHasLocation = async () => {
    const location = await AsyncStorage.getItem("location");
    location && this.setState({ hasLocation: true });
  };

  _onSearchTextChange = text => {
    this.setState({ search: text });
  };

  _onSubmit = async () => {
    await AsyncStorage.setItem("location", this.state.search);
    this.props.navigation.navigate("Home", { cityName: this.state.search });
  };

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          <Icon name="md-sunny" size={30} />
          {`Open Weather`}
        </Text>
        <SearchBar
          placeholder="Search location..."
          onChangeText={this._onSearchTextChange}
          containerStyle={{
            width: "90%",
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
          inputStyle={{
            color: "black"
          }}
          value={this.state.search}
          lightTheme={true}
          round
          onSubmitEditing={this._onSubmit}
        />
        {this.state.hasLocation && (
          <Button
            containerStyle={{width: "85%", marginVertical: 10}}
            iconContainerStyle={{alignSelf: "flex-end"}}
            raised
            type="solid"
            title="Weather"
            iconRight
            icon={<Icon name="ios-arrow-round-forward" color="white" size={30} style={{paddingHorizontal: 10}}></Icon>}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 30,
    color: "deepskyblue",
    fontSize: 30,
    fontWeight: "bold"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => dispatch(setLocation(location))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchLocationScreen);
