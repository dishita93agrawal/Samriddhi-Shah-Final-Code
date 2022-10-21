import * as React from 'react';
import {
  Text,
  View,

  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

import { Header, Icon, Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ageGroup: this.props.route.params.details['ageGroup'],
      date: this.props.route.params.details['date'],
      venue: this.props.route.params.details['venue'],
      description: this.props.route.params.details['description'],
      eventName: this.props.route.params.details['eventName'],
      facebook: this.props.route.params.details['facebook'],
      host: this.props.route.params.details['host'],
      insta: this.props.route.params.details['insta'],
      participationFee: this.props.route.params.details['participationFee'],
      prize: this.props.route.params.details['prize'],
      snapchat: this.props.route.params.details['snapchat'],
      image: this.props.route.params.details['image'],
      email: this.props.route.params.details['email'],
      sport: this.props.route.params.details['sport'],
      mobileNumber: '',
      userId: firebase.auth().currentUser.email,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    db.collection('users')
      .where('email', '==', this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            mobileNumber: doc.data().mobileNumber,
          });
        });
      });
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
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: this.state.eventName,
            style: { color: 'white' },
          }}
        />

        <ScrollView
          contentContainerStyle={{
            flex: 2,
            alignItems: 'center',
            backgroundColor: 'black',
            marginTop: -5,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 10,
              borderRadius: 5,
              borderColor: 'grey',
              borderWidth: 0.5,
              alignItems: 'center',
              width: '90%',
              padding:10
            }}>
            <Image
              style={{
                marginTop: 10,
                borderColor: 'grey',
                borderWidth: 1,
                height: 200,
                width: '95%',
                resizeMode: 'contain',
                backgroundColor: 'rgba(0,0,0,0.7)',
              }}
              source={{
                uri: this.state.image,
              }}
            />

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 5,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  fontSize: 19,
                  flex: 0.7,
                }}>
                {this.state.eventName}
              </Text>

              <Text
                style={{
                  flex: 0.3,
                  color: 'grey',
                  borderWidth: 1,
                  borderColor: 'grey',
                  textAlign: 'center',
                  fontSize: 15,
                  justifyContent: 'center',
                }}>
                {this.state.participationFee}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                marginTop: 5,
                marginBottom: 10,
                alignSelf: 'center',

                width: '90%',

                alignItems: 'center',
              }}>
              <LinearGradient
                colors={['#5d34a5', '#482980']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 80,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(`tel:${this.state.mobileNumber}`);
                  }}>
                  <Icon
                    name="ios-call-outline"
                    type="ionicon"
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={['#5d34a5', '#482980']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 80,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(
                      'mailto:' +
                        this.state.email +
                        '?subject=' +
                        'Interested in participating in ' +
                        this.state.eventName
                    );
                  }}>
                  <Icon
                    name="mail-outline"
                    type="ionicon"
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                marginHorizontal: 5,
                marginTop: 5,
                marginBottom: 10,

                textAlign: 'center',
              }}>
              {this.state.description}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: 5,

                width: '90%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 7,
                }}>
                <Icon name="md-time" type="ionicon" size={25} color="grey" />
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    marginLeft: 5,
                    marginBottom: 2,
                    marginTop: 5,
                    textTransform: 'uppercase',
                  }}>
                  {this.state.date}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <Icon
                  name="location-sharp"
                  type="ionicon"
                  size={25}
                  color="grey"
                />
                <Text
                  style={{
                    color: 'grey',
                    opacity: 0.9,
                    fontSize: 14,
                    marginLeft: 5,
                    marginBottom: 2,
                    marginTop: 5,
                    textTransform: 'uppercase',
                  }}>
                  {this.state.venue}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <Icon
                  name="ios-person-circle-sharp"
                  type="ionicon"
                  size={25}
                  color="grey"
                />
                <Text
                  style={{
                    color: 'grey',
                    opacity: 0.9,
                    fontSize: 14,
                    marginLeft: 8,
                    marginBottom: 2,
                    marginTop: 5,

                    textTransform: 'uppercase',
                  }}>
                  {this.state.ageGroup}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
