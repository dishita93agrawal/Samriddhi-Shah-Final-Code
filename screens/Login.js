import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

import { LinearGradient } from 'expo-linear-gradient';
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  userLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorMsg = error.message;
        return alert(errorMsg);
      });
  };

  forgotPassword = (email) => {
    if (email !== '') {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          alert(
            'Reset password link has been sent to ' +
              email +
              ', follow the link to reset your password.'
          );
        })

        .catch(function (error) {
          alert(error);
        });
    } else {
      alert('Please enter your registered Email Id.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, resizeMode: 'cover' }}
          source={require('../assets/loginLarge.png')}>
          <View style={styles.header}></View>
          <View style={[styles.footer]}>
            <View style={{ justifyContent: 'space-around' }}>
              <TextInput
                keyboardType="email-address"
                placeholder="example@gmail.com"
                placeholderTextColor="#A9A3A3"
                onChangeText={(text) => {
                  this.setState({
                    email: text,
                  });
                }}
                style={styles.input}
              />

              <TextInput
                secureTextEntry={true}
                placeholder="* * * * * * * *"
                placeholderTextColor="#A9A3A3"
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
                style={styles.input}
              />
              <View
                style={{ alignSelf: 'center', marginTop: 20, marginLeft: 170 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.forgotPassword(this.state.email);
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      margin: 5,
                      marginTop: -35,
                      textAlign: 'right',
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <LinearGradient
                colors={['#5d34a5', '#482980']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, { marginBottom: 10, marginTop: 50 }]}>
                <TouchableOpacity
                  style={{
                    width: 300,
                    height: 50,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.userLogin(this.state.email, this.state.password);
                  }}>
                  <Text style={styles.btnTxt}>LOGIN</Text>
                </TouchableOpacity>
              </LinearGradient>

             
                  <Text
                  onPress={() => {
                    this.props.navigation.navigate('Signup');
                  }}
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      color: 'white',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Don't have an account yet? 
                    <Text
                    style={{
                      fontSize: 10,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                       Sign Up Now!
                  </Text>
                  </Text>

                
                
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    padding: 10,
    color: '#A9A3A3',
    backgroundColor: 'rgba(51, 50, 57, 0.5)',
    width: '85%',
    margin: 20,
  },

  btnTxt: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },

  button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 0.6,
  },
  footer: {
    marginTop: -60,
    flex: 0.4,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
});
