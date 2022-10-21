import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

import { LinearGradient } from 'expo-linear-gradient';

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      wing: '',
      age: 0,
      gender: '',
    };
  }

  userSignup = (email, password, confirmPassword, age) => {
    if (password !== confirmPassword) {
      alert('Error : Passcode does not Match .. ');
    } else {
      if (
        this.state.firstName === '' ||
        this.state.lastName === '' ||
        this.state.wing === '' ||
        this.state.age === '' ||
        this.state.mobileNumber === ''
      ) {
        alert(
          'The above input fields are required in order to register for the app.'
        );
      } else if (
        this.state.mobileNumber.length > 10 ||
        this.state.mobileNumber.length < 9
      ) {
        alert('Invalid mobile number. It should be a 10 digit number.');
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            db.collection('users').add({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              mobileNumber: this.state.mobileNumber,
              age: this.state.age,
              gender: this.state.gender,
              image: '#',
              isOppActive: false,
              wing: this.state.wing,
              isCoachActive: false,
            });
            return alert(this.state.email + ' Successfully Registered ! ');
          })
          .catch((error) => {
            var errorMsg = error.message;
            return alert(errorMsg);
          });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, resizeMode: 'cover' }}
          source={require('../assets/signupNew.png')}>
          <View style={styles.header}></View>
          <View style={[styles.footer]}>
            <View style={{ justifyContent: 'space-around' }}>
              <ScrollView>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#A9A3A3"
                    onChangeText={(text) => {
                      this.setState({
                        firstName: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#A9A3A3"
                    onChangeText={(text) => {
                      this.setState({
                        lastName: text,
                      });
                    }}
                    style={styles.input}
                  />

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
                    placeholder="Mobile Number"
                    placeholderTextColor="#A9A3A3"
                    onChangeText={(text) => {
                      this.setState({
                        mobileNumber: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Age "
                    keyboardType="numeric"
                    placeholderTextColor="#A9A3A3"
                    onChangeText={(text) => {
                      this.setState({
                        age: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Flat No.  (Block/ Wing)"
                    placeholderTextColor="#A9A3A3"
                    keyboardType="numeric"
                    multiline={true}
                    onChangeText={(text) => {
                      this.setState({
                        wing: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <TextInput
                    secureTextEntry={true}
                    placeholderTextColor="#A9A3A3"
                    placeholder="Password"
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <TextInput
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    placeholderTextColor="#A9A3A3"
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                    style={styles.input}
                  />

                  <View style={styles.btnSpan}>
                    <LinearGradient
                      // Button Linear Gradient
                      colors={['#5d34a5', '#482980']}
                      start={{ x: -1, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.button,
                        { marginBottom: 10, marginTop: 30 },
                      ]}>
                      <TouchableOpacity
                        style={{
                          width: 300,
                          height: 50,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          this.userSignup(
                            this.state.email,
                            this.state.password,
                            this.state.confirmPassword,
                            this.state.age
                          );
                        }}>
                        <Text style={styles.btnTxt}>SIGN UP</Text>
                      </TouchableOpacity>
                    </LinearGradient>

                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Login');
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginTop: 5,
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'white',
                            margin: 5,
                            marginTop: -5,
                            textAlign: 'center',
                          }}>
                          Back To
                        </Text>

                        <Text
                          style={{
                            fontSize: 14,
                            color: '#291749',
                            fontWeight: '700',
                            margin: 5,
                            marginTop: -5,
 
                            marginLeft: 1,
                            textAlign: 'center',
                          }}>
                          Log In
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
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
    margin: 12,
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
    flex: 0.3,
  },
  footer: {
    marginTop: -60,
    flex: 0.7,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
});
