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
import moment from 'moment';
import { Linking } from 'react-native';

import { Header, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class OpponentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: this.props.route.params.details['playername'],
      playerSport: this.props.route.params.details['sport'],
      playerEmail: this.props.route.params.details['email'],
      playerLevel: this.props.route.params.details['level'],
      playerBio: this.props.route.params.details['bio'],
      playerAge: this.props.route.params.details['age'],
      playerInsta: this.props.route.params.details['insta'],
      playerSnap: this.props.route.params.details['snapchat'],
      playerFacebook: this.props.route.params.details['facebook'],
      playerTwitter: this.props.route.params.details['twitter'],
      playerImg: this.props.route.params.details['image'],
      isOppActive: false,
      playerWing: '',
      playerMobileNumber: 0,
      playerGender: '',
      playerCity: '',
      playerLastName: '',
      userId: firebase.auth().currentUser.email,
      rivals: this.props.route.params.details['rivals'],
      displayRivalBtn: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
    this.rivalConfirmation();
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  rivalConfirmation() {
    {
      this.state.rivals.includes(this.state.userId)
        ? this.setState({ displayRivalBtn: false })
        : this.setState({ displayRivalBtn: true });
    }
  }

  addNotification = (userId, playerEmail, playerName, username) => {
    var msg = username + ' has sent you a opponent request.';
    var date = moment().format('DD/MM/YYYY');
    var sentFrom = userId;
    var sentTo = playerEmail;
    var randomRequestId = this.createUniqueId();
    db.collection('notification').add({
      message: 'New Opponent Request',
      date: date,
      sentFrom: sentFrom,
      sentTo: sentTo,
      notificationType: 'opponent',
      status: 'false',
      requestId: randomRequestId,
    });

    alert(
      'Request has been sent. Check for updates on the notifications page.'
    );
  };

  getUserInfo = () => {
    db.collection('users')
      .where('email', '==', this.state.playerEmail)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            playerMobileNumber: doc.data().mobileNumber,
            playerGender: doc.data().gender,
            playerCity: doc.data().city,
            playerLastName: doc.data().lastName,
            playerWing: doc.data().wing,
          });
        });
      });
    db.collection('users')
      .where('email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            username: doc.data().firstName,
            isOppActive: doc.data().isOppActive,
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
            text: this.state.playerSport + ' Player',
            style: { color: 'white' },
          }}
        />

        <View
          style={{
            backgroundColor: 'white',
            margin: 10,
            marginTop: 20,
            borderRadius: 5,
            borderColor: 'grey',
            borderWidth: 0.5,
            alignItems: 'center',
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
              uri: this.state.playerImg,
            }}
          />

          <View
            style={{
              width: '95%',
              marginTop: 20,
              marginHorizontal:20,
              flexDirection: 'row',
              justifyContent:"space-between"
            }}>
            <Text
              style={{
                fontSize: 19,
                mrginTop: 25,
              }}>
              {this.state.playerName + ', ' + this.state.playerAge}
            </Text>

            <Text
              style={{
                color: 'grey',
                borderWidth: 1,
                borderColor: 'grey',
                textAlign: 'center',
                fontSize: 19,
                justifyContent: 'center',
              }}>
              {this.state.playerLevel}
            </Text>
          </View>
          <View>
            {this.state.rivals.includes(this.state.userId) ? (
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-around',
                }}>
                <LinearGradient
                  colors={['#5d34a5', '#482980']}
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    marginBottom: 15,
                    marginTop: 35,
                    width: 80,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      height: 40,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      Linking.openURL(`tel:${this.state.playerMobileNumber}`);
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
                    marginBottom: 15,
                    marginTop: 25,
                    width: 80,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      height: 40,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      Linking.openURL(
                        'mailto:' + this.state.playerEmail + '?subject=' + 'Hi '
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
            ) : null}

            {this.state.playerEmail !== this.state.userId &&
            this.state.isOppActive &&
            this.state.displayRivalBtn === true ? (
              <LinearGradient
                colors={['#5d34a5', '#482980']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, { marginBottom: 10, marginTop: 30 }]}>
                <TouchableOpacity
                  onPress={() => {
                    this.addNotification(
                      this.state.userId,
                      this.state.playerEmail,
                      this.state.playerName,
                      this.state.username
                    );
                  }}
                  style={{
                    width: 270,
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    BECOME RIVALS
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : null}

            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                marginTop: 20,
                marginBottom: 10,
                marginHorizontal:10
              }}>
              {this.state.playerBio}
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 10,

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={{ flexDirection: 'column' }}>
              <Icon size={20} name="location-pin" color="grey" />
              <Text
                style={{
                  color: 'grey',
                  opacity: 0.9,
                  fontSize: 12,
                  marginLeft: 5,
                  marginBottom: 2,
                }}>
                {this.state.playerWing}
              </Text>
            </View >

            <View  style={{
              paddingLeft: 10}}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 13,
                  textTransform: 'uppercase',
                  textAlign: 'left',
                }}>
                Social Media Handles
              </Text>

              <View
                style={{
                  marginTop: 10,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{
                    width: '20%',
                  }}
                  onPress={() => {
                    Linking.openURL(this.state.playerInsta);
                  }}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: 'https://pngimg.com/uploads/instagram/instagram_PNG10.png',
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: '20%',
                  }}
                  onPress={() => {
                    Linking.openURL(this.state.playerSnap);
                  }}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1000px-Snapchat_logo.svg.png',
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: '20%',
                  }}
                  onPress={() => {
                    Linking.openURL(this.state.playerFacebook);
                  }}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png',
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: '20%',
                  }}
                  onPress={() => {
                    Linking.openURL(this.state.playerTwitter);
                  }}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: 'https://www.net-aware.org.uk/siteassets/images-and-icons/application-icons/app-icons-twitter.png?w=585&scale=down',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 25,
    height: 25,
  },
  button: {
    width: 270,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
});
