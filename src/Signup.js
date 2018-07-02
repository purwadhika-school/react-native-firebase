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

class Signup extends Component {
  constructor(props) {
    super(props);

    state = {
      email: "",
      password: "",
      c_password: "",
      authenticating: false
    };
  }

  onPressSignUp() {
    this.setState({
      authenticating: true
    });

    const { email, password, c_password } = this.state;

    if ((email !== "") | (password !== "") | (c_password !== "")) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
          this.setState({
            authenticating: false,
            user,
            error: ""
          });
        })
        .catch(() =>
          this.setState({
            authenticating: false,
            user: null,
            error: "Authentication Failure"
          })
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Signup Page</Text>
        <TextInput
          style={{ width: "90%" }}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={{ width: "90%" }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          style={{ width: "90%" }}
          placeholder="Confirmation Password"
          secureTextEntry={true}
          onChangeText={c_password => this.setState({ c_password })}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ backgroundColor: "orange", marginRight: 5 }}
            onPress={() => this.onPressSignUp()}
          >
            <Text
              style={{
                margin: 15,
                fontSize: 17,
                color: "white",
                fontWeight: "bold"
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
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

export default Signup;
