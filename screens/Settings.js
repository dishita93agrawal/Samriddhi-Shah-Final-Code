import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Header, Icon } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      city: '',
      age: 0,
      gender: '',
      userId: firebase.auth().currentUser.email,
      image: '',
    };
  }
  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            mobileNumber: doc.data().mobileNumber,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            image: doc.data().image,
          });
        });
      });
  };

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black' }}>
        <Header
          backgroundColor="black"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          }
          rightComponent={
            <Icon
              name="logout"
              color="white"
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.navigation.navigate('Main');
                  })
                  .catch((error) => {});
              }}
            />
          }
          centerComponent={{ text: 'Settings', style: { color: 'white' } }}
        />

        <View
          style={{ marginTop: -5, flex: 1, justifyContent: 'space-around' }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#5d34a5', '#482980', '#000']}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 0.2, padding: 10, justifyContent: 'center' }}>
            <View
              style={{
                paddingLeft: 10,
                marginTop: 10,
                marginBottom: 20,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  margin: 5,
                  marginLeft: 20,
                  borderColor: 'black',
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 40,
                }}
                source={{
                  uri: this.state.image,
                }}
              />

              <View
                style={{
                  marginLeft: 15,
                  margin: 10,
                  marginTop: 15,
                  alignItems: 'center',
                }}>
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>
                  {this.state.firstName + ' ' + this.state.lastName}
                </Text>

                <Text style={{ color: 'white' }}> {this.state.userId}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={{ flex: 0.7, padding: 10 }}>
            <View
              style={{
                height: 450,
                justifyContent: 'space-around',
                marginTop: 50,
              }}>
              <TouchableOpacity
                style={{
                  width: '70%',
                  marginTop: 30,
                  borderRadius: 10,
                  marginBottom: 5,
                  alignSelf: 'center',
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 15,
                }}
                onPress={() => {
                  this.props.navigation.navigate('Edit');
                }}>
                <Text
                  style={{

                    color: 'white',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  EDIT PROFILE
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={['#5d34a5', '#482980']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, { marginBottom: 10, marginTop: 30 }]}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('About');
                  }}>
                  <Text
                    style={{

                      color: 'white',
                      textAlign: 'center',
                    }}>
                    ABOUT US
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <TouchableOpacity
                style={{
                  width: '70%',
                  marginTop: 30,
                  borderRadius: 10,
                  marginBottom: 5,
                  alignSelf: 'center',
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 15,
                }}
                onPress={() => {
                  this.props.navigation.navigate('Feedback');
                }}>
                <Text
                  style={{

                    color: 'white',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  FEEDBACK & QUERIES
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.1, padding: 10 }}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
});
