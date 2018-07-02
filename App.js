/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native"
const firebase = require("firebase")

export default class App extends Component {
  state = {
    email: "",
    password: "",
    authenticating: false
  }

  initializeFirebase() {
    // const firebase = require("firebase")

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA_QJL7p_xeIVPpGvYdSINJYTNtIQqaIbs",
      authDomain: "rnfb-bc6b0.firebaseapp.com",
      databaseURL: "https://rnfb-bc6b0.firebaseio.com",
      projectId: "rnfb-bc6b0",
      storageBucket: "rnfb-bc6b0.appspot.com",
      messagingSenderId: "507539381018"
    }
    firebase.initializeApp(config)

    //inicializando o firestore
    const firestore = require("firebase/firestore")
    db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
  }

  componentWillMount() {
    this.initializeFirebase()
  }

  onPressSignIn() {
    this.setState({
      authenticating: true
    })

    // const firebase = require("firebase")

    // // Initialize Firebase
    // var config = {
    //   apiKey: "AIzaSyA_QJL7p_xeIVPpGvYdSINJYTNtIQqaIbs",
    //   authDomain: "rnfb-bc6b0.firebaseapp.com",
    //   databaseURL: "https://rnfb-bc6b0.firebaseio.com",
    //   projectId: "rnfb-bc6b0",
    //   storageBucket: "rnfb-bc6b0.appspot.com",
    //   messagingSenderId: "507539381018"
    // }
    // firebase.initializeApp(config)

    // //inicializando o firestore
    // const firestore = require("firebase/firestore")
    // db = firebase.firestore()
    // db.settings({ timestampsInSnapshots: true })




    const { email, password } = this.state

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user)
        console.log(user.user.uid)
        this.setState({
          authenticating: false,
          user,
          error: ""
        })
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
          )
      })
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
    )
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
})

// import React from 'react';
// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import * as firebase from 'firebase';
// import { Input } from './components/Input';
// import { Button } from './components/Button';

// export default class App extends React.Component {
//   state = {
//     email: '',
//     password: '',
//     authenticating: false,
//     user: null,
//     error: '',
//   }

//   componentWillMount() {
//     const firebaseConfig = {
//       apiKey: '',
//       authDomain: '',
//     }

//     firebase.initializeApp(firebaseConfig);
//   }

//   onPressSignIn() {
//     this.setState({
//       authenticating: true,
//     });

//     const { email, password } = this.state;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then(user => this.setState({
//         authenticating: false,
//         user,
//         error: '',
//       }))
//       .catch(() => {
//         // Login was not successful
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//           .then(user => this.setState({
//             authenticating: false,
//             user,
//             error: '',
//           }))
//           .catch(() => this.setState({
//             authenticating: false,
//             user: null,
//             error: 'Authentication Failure',
//           }))
//       })
//   }

//   onPressLogOut() {
//     firebase.auth().signOut()
//       .then(() => {
//         this.setState({
//           email: '',
//           password: '',
//           authenticating: false,
//           user: null,
//         })
//       }, error => {
//         console.error('Sign Out Error', error);
//       });
//   }

//   renderCurrentState() {
//     if (this.state.authenticating) {
//       return (
//         <View style={styles.form}>
//           <ActivityIndicator size='large' />
//         </View>
//       )
//     }

//     if (this.state.user !== null) {
//       return (
//         <View style={styles.form}>
//           <Text>Logged In</Text>
//           <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
//         </View>
//       )
//     }

//     return (
//       <View style={styles.form}>
//         <Input
//           placeholder='Enter your email...'
//           label='Email'
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//         />
//         <Input
//           placeholder='Enter your password...'
//           label='Password'
//           secureTextEntry
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button onPress={() => this.onPressSignIn()}>Log In</Button>
//         <Text>{this.state.error}</Text>
//       </View>
//     )

//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.renderCurrentState()}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row'
//   },
//   form: {
//     flex: 1
//   }
// });
