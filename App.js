/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login with facebook"
          buttonStyle={{borderRadius: 30 }}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            start: {x: 0, y: 0},
            end: {x: 1, y: 0},
            colors: ["#FF4500","#FF8C00","#FFD700" ]
          }}
          icon={
            <Icon name="facebook-f" color="white" style={{paddingRight: 10, fontSize: 30}}></Icon>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
