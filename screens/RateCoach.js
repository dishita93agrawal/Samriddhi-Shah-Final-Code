import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {  AirbnbRating } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import { Header, Icon, Avatar } from 'react-native-elements';
export default class RateCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachEmail: this.props.route.params.coachEmail,
      coachDocId: this.props.route.params.coachDocId,
      rating: 0,
    };
  }

  componentDidMount() {}
  sendRating = (rating, coachMail, docId) => {
    var userId = this.state.userId;

    try {
      // console.log(rating);
      db.collection('coach')
        .where('email', '==', coachMail)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            // console.log(doc.id);
            db.collection('coach')
              .doc(doc.id)
              .update({
                ratings: firebase.firestore.FieldValue.arrayUnion(
                  this.state.rating
                ),
              });
          });
        });
    } catch (e) {
      // console.log(e);
    }
    alert('Thank you so much for taking the time to leave us a rating.');
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header
          backgroundColor="black"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              onPress={() => this.props.navigation.navigate('CoachDetails')}
            />
          }
          centerComponent={{
            text: 'Rate Coach',
            style: { color: 'white' },
          }}
        />

        <ScrollView
          contentContainerStyle={{
            flex: 2,
            alignItems: 'center',
            backgroundColor: 'black',
            marginTop: -5,
            justifyContent: 'center',
          }}>
          <View>
            <AirbnbRating
              count={6}
              selectedColor="#5d34a5"
              reviewColor="white"
              style={{ color: '#5d34a5' }}
              reviews={[
                'Terrible',
                'Bad',
                'OK',
                'Good',
                'Very Good',
                'Amazing',
              ]}
              defaultRating={6}
              size={20}
              onFinishRating={(rating) => {
                this.setState({
                  rating: rating,
                });
              }}
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
                  this.sendRating(
                    this.state.rating,
                    this.state.coachEmail,
                    this.state.coachDocId
                  );
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    );
  }
}
