import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import {  AirbnbRating } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';

import { CheckBox } from 'react-native-elements';

export default class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      rating: '',
      mobileNumber: '',
      name: '',
      feedback: '',
      checked: '',
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
          var data = doc.data();
          this.setState({
            mobileNumber: doc.data().mobileNumber,
            name: doc.data().firstName,
          });
        });
      });
  };

  submitForm = (rating, feedback, permission, mobileNumber, name) => {
    var userId = this.state.userId;
    db.collection('feedback')
      .add({
        email: userId,
        rating: rating,
        feedback: feedback,
        permission: permission,
        mobileNumber: mobileNumber,
        name,
      })
      .then((docRef) => {
        // console.log(docRef.id);
      })
      .catch((error) => {
        // console.log(error);
      });

    alert(
      'Thank you for your review! Your feedback will help us provide a better experience. You may expect a reply shortly.'
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <View style={{ justifyContent: 'flex-start' }}>
          <Header
            backgroundColor="black"
            leftComponent={
              <Icon
                name="arrow-back"
                color="white"
                onPress={() => this.props.navigation.navigate('Settings')}
              />
            }
            centerComponent={{
              text: 'Send FeedBack & Query',
              style: { color: 'white' },
            }}
          />
        </View>
        <ScrollView
          style={{ marginTop: -5, backgroundColor: 'black', padding: 10 }}>
          <AirbnbRating
            count={6}
            selectedColor="#5d34a5"
            reviewColor="white"
            style={{ color: '#5d34a5' }}
            reviews={['Terrible', 'Bad', 'OK', 'Good', 'Very Good', 'Amazing']}
            defaultRating={6}
            size={20}
            onFinishRating={(rating) => {
              this.setState({
                rating: JSON.stringify(rating),
              });
            }}
          />

          <TextInput
            placeholder="Feedback and Queries"
            placeholderTextColor="#A9A3A3"
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                feedback: text,
              });
            }}
            style={{
              alignSelf: 'center',
              padding: 10,
              color: '#A9A3A3',
              backgroundColor: '#2A2A2A',
              width: '85%',
              margin: 10,
              height: 80,
              marginTop: 50,
            }}
          />

          <TextInput
            placeholderTextColor="#A9A3A3"
            placeholder="Mobile Number"
            value={this.state.mobileNumber}
            onChangeText={(text) => {
              this.setState({
                mobileNumber: text,
              });
            }}
            style={{
              alignSelf: 'center',
              padding: 10,
              color: '#A9A3A3',
              backgroundColor: '#2A2A2A',
              width: '85%',
              margin: 10,
            }}
          />

          <CheckBox
            textStyle={{
              textAlign: 'center',
              color: '#A9A3A3',
              fontWeight: '400',
            }}
            containerStyle={{
              backgroundColor: '#2A2A2A',
              width: '85%',
              borderWidth: 0,
              alignSelf: 'center',
              marginTop: 50,
              padding: 15,
            }}
            checkedIcon="dot-circle-o"
            checkedColor="#5d34a5"
            title="If you want us to get in touch with you regarding this concern, kindly check this box."
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />

          <LinearGradient
            colors={['#5d34a5', '#482980']}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: '70%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              alignSelf: 'center',
              marginBottom: 10,
              marginTop: 50,
            }}>
            <TouchableOpacity
              style={{
                width: 300,
                height: 50,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                this.submitForm(
                  this.state.rating,
                  this.state.feedback,
                  this.state.checked,
                  this.state.mobileNumber,
                  this.state.name
                );
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                CONTINUE
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }
}
