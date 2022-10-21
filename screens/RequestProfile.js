import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

import moment from 'moment';

import { Header, Icon, Avatar } from 'react-native-elements';

export default class RequestProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerEmail: this.props.navigation.getParam.details['sentFrom'],
      notiRequestId: this.props.navigation.getParam.details['requestId'],
      notiDocId: '',
      userId: firebase.auth().currentUser.email,
      username: '',
      playerMobileNumber: 0,
      playerGender: '',
      playerLastName: '',
      playerName: '',
      playerWing: '',

      playerSport: '',
      playerLevel: '',
      playerBio: '',
      playerAge: '',
      playerInsta: '',
      playerSnap: '',
      playerFacebook: '',
      playerTwitter: '',
      playerImg: '',
      rivals: [],
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  addNotificationDecline = (userId, playerEmail, playerName, username) => {
    var msg = userId + ' has declined your opponent request.';
    var date = moment().format('DD/MM/YYYY');
    var sentFrom = userId;
    var sentTo = playerEmail;

    var randomRequestId = this.createUniqueId();

    db.collection('notification').doc(this.state.notiDocId).update({
      status: 'true',
    });

    db.collection('notification').add({
      message: msg,
      date: date,
      sentFrom: sentFrom,
      sentTo: sentTo,
      status: 'false',
      notificationType: 'opponent',
      requestId: randomRequestId,
    });
    alert(playerEmail + ', ' + playerName + ' will be notified soon.');
  };

  addNotificationAccept = (userId, playerEmail, playerName, username) => {
    var msg = userId + ' has accepted your opponent request. ';
    var date = moment().format('DD/MM/YYYY');
    var sentFrom = userId;
    var sentTo = playerEmail;
    var randomRequestId = this.createUniqueId();

    db.collection('notification').add({
      message: msg,
      date: date,
      sentFrom: sentFrom,
      sentTo: sentTo,
      status: 'false',
      notificationType: 'opponent',
      requestId: randomRequestId,
    });

    db.collection('notification').doc(this.state.notiDocId).update({
      status: 'true',
    });

    alert(playerEmail + ', ' + playerName + ' will be notified soon.');

    try {
      // console.log(this.state.userId);
      db.collection('opponents')
        .where('email', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            // console.log(doc.id);
            db.collection('opponents')
              .doc(doc.id)
              .update({
                rivals: firebase.firestore.FieldValue.arrayUnion(
                  this.state.playerEmail
                ),
              });
          });
        });
    } catch (e) {
      // console.log(e);
    }
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

            playerLastName: doc.data().lastName,
            playerName: doc.data().firstName,
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
          });
        });
      });

    db.collection('notification')
      .where('requestId', '==', this.state.notiRequestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            notiDocId: doc.id,
          });
        });
      });

    db.collection('opponents')
      .where('email', '==', this.state.playerEmail)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            playerSport: doc.data().sport,

            playerLevel: doc.data().level,
            playerBio: doc.data().bio,
            playerAge: doc.data().age,
            playerInsta: doc.data().insta,
            playerSnap: doc.data().snapchat,
            playerFacebook: doc.data().facebook,
            playerTwitter: doc.data().twitter,
            playerImg: doc.data().image,
            rivals: doc.data().rivals,
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
              onPress={() => this.props.navigation.navigate('OpponentsScreen')}
            />
          }
          centerComponent={{
            text: this.state.playerSport + ' Player',
            style: { color: 'white' },
          }}
        />

        <ScrollView
          style={{
            flex: 2,
            alignItems: 'center',
            backgroundColor: 'black',
            marginTop: -5,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 10,
              marginTop: 20,
              borderRadius: 5,
              borderColor: 'grey',
              borderWidth: 0.5,
              alignItems: 'center',
              height: 550,
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

            <View style={{ flex: 1, marginLeft: 20, margin: 15 }}>
              <View
                style={{
                  paddingLeft: 10,
                  flex: 0.5,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    fontSize: 19,
                    flex: 0.7,
                  }}>
                  {this.state.playerName + ', ' + this.state.playerAge}
                </Text>

                <Text
                  style={{
                    flex: 0.3,
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

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  flex: 1,
                  justifyContent: 'space-around',
                }}>
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
                      this.addNotificationAccept(
                        this.state.userId,
                        this.state.playerEmail,
                        this.state.playerName,
                        this.state.username
                      );
                    }}>
                    <Icon
                      name="checkmark-circle-outline"
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
                      this.addNotificationDecline(
                        this.state.userId,
                        this.state.playerEmail,
                        this.state.playerName,
                        this.state.username
                      );
                    }}>
                    <Icon name="cancel" size={25} color="white" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View> </View>

              <Text
                style={{
                  color: 'grey',
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  textAlign: 'left',
                }}>
                {this.state.playerBio}
              </Text>

              <View
                style={{
                  paddingLeft: 10,
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
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
                </View>

                <View>
                  <Text
                    style={{
                      color: 'grey',
                      opacity: 0.8,
                      fontSize: 13,
                      textTransform: 'uppercase',
                      textAlign: 'left',
                    }}>
                    Social Media Handles
                  </Text>

                  <View
                    style={{
                      marginTop: 3,
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
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
                        window.open(this.state.playerSnap, '_blank');
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 25,
    height: 25,
  },
});
