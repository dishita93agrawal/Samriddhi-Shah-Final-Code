import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
export default class Main extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ImageBackground
          style={{ flex: 1, resizeMode: 'cover', justifyContent: 'flex-end' }}
          source={require('../assets/darkvbl.png')}>
          <View style={{ justifyContent: 'space-around', marginBottom: 50 }}>
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
                this.props.navigation.navigate('Login');
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  alignItems: 'center',
                }}>
                SIGN IN
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={['#5d34a5', '#482980']}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, { marginBottom: 10, marginTop: 30 }]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
                <Text
                  style={{

                    color: 'white',
                    textAlign: 'center',
                  }}>
                  CREATE AN ACCOUNT
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground>
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
