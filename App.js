import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import Login from "./src/Login";
import Signup from "./src/Signup";
import Main from "./src/Main";

const RouteStack = StackNavigator(
  {
    LoginPage: {
      screen: Login,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    SignupPage: {
      screen: Signup,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    MainPage: {
      screen: Main,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "LoginPage"
  }
);

export default RouteStack;
