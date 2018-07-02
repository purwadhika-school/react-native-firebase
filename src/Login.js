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

class Login extends Component {
  constructor(props) {
    super(props);

    state = {
      email: "",
      password: "",
      authenticating: false
    };
    this.firebaseSetup();
  }

  firebaseSetup() {
    const config = {
      apiKey: "AIzaSyA_QJL7p_xeIVPpGvYdSINJYTNtIQqaIbs",
      authDomain: "rnfb-bc6b0.firebaseapp.com",
      databaseURL: "https://rnfb-bc6b0.firebaseio.com",
      projectId: "rnfb-bc6b0",
      storageBucket: "rnfb-bc6b0.appspot.com",
      messagingSenderId: "507539381018"
    };
    firebase.initializeApp(config);
  }

  onPressSignIn() {
    this.setState({
      authenticating: true
    });

    const { email, password } = this.state;

    if ((email !== "") | (password !== "")) {
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
          
          if (user.user.uid && user.user.uid !== ""){
              this.props.navigation.navigate("MainPage")
          }

        })
        .catch(() => {
          console.log("Login error!");
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login Page</Text>
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ backgroundColor: "orange", marginRight: 5 }}
            onPress={() => this.onPressSignIn()}
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
          <TouchableOpacity
            style={{ backgroundColor: "blue", marginLeft: 5 }}
            onPress={() => {
              console.log(this.props);
              this.props.navigation.navigate("SignupPage");
            }}
          >
            <Text
              style={{
                margin: 15,
                fontSize: 17,
                color: "white",
                fontWeight: "bold"
              }}
            >
              Signup
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

export default Login;
