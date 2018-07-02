/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
const firebase = require("firebase");

class App extends Component {
  constructor(props) {
    super(props);

    state = {
      email: "",
      password: "",
      authenticating: false
    };

    const config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp(config);
  }

  onPressSignIn() {
    this.setState({
      authenticating: true
    });

    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        console.log(user.user.uid);
        this.setState({
          authenticating: false,
          user,
          error: ""
        });
      })
      .catch(() => {
        // Login was not successful
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user =>
            this.setState({
              authenticating: false,
              user,
              error: ""
            })
          )
          .catch(() =>
            this.setState({
              authenticating: false,
              user: null,
              error: "Authentication Failure"
            })
          );
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <TextInput
          placeholder="Enter your email..."
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="Enter your password..."
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity onPress={() => this.onPressSignIn()}>
          <Text>Submit</Text>
        </TouchableOpacity>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default App;
