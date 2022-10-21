import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Header, Icon, Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class RegisterOpponent extends React.Component {
  constructor() {
    super();
    this.state = {
      sport: '',
      level: '',
      userId: firebase.auth().currentUser.email,
      name: '',
      age: 0,
      bio: '',
      insta: '',
      snapchat: '',
      facebook: '',
      twitter: '',
      image: '',
      userDocId: '',
      isOppActive: null,
      oppDocId: '',
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
            name: doc.data().firstName + ' ' + doc.data().lastName,
            age: doc.data().age,
            image: doc.data().image,
            isOppActive: doc.data().isOppActive,
            userDocId: doc.id,
          });
        });
      });

    db.collection('opponents')
      .where('email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            sport: doc.data().sport,
            level: doc.data().level,
            bio: doc.data().bio,
            insta: doc.data().insta,
            facebook: doc.data().facebook,
            snapchat: doc.data().snapchat,
            twitter: doc.data().twitter,
            oppDocId: doc.id,
          });
        });
      });
  };

  submitForm = (
    sport,
    level,
    name,
    age,
    bio,
    insta,
    fb,
    snapchat,
    twitter,
    image,
    userDocId
  ) => {
    var userId = this.state.userId;
    db.collection('opponents')
      .add({
        email: userId,
        sport: sport,
        level: level,
        playername: name,
        age: age,
        bio: bio,
        insta: insta,
        facebook: fb,
        snapchat: snapchat,
        twitter: twitter,
        image: image,
        rivals: [],
      })
      .then((docRef) => {
        // console.log(docRef.id);
      })
      .catch((error) => {
        // console.log(error);
      });

    db.collection('users')
      .where('email', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(userDocId).update({
            isOppActive: true,
          });
        });
      });

    alert('Opponent Added');
  };

  updateForm = (
    userId,
    sport,
    level,
    bio,
    insta,
    facebook,
    snapchat,
    twitter,
    oppDocId
  ) => {
    db.collection('opponents').doc(oppDocId).update({
      sport: sport,
      level: level,
      bio: bio,
      insta: insta,
      facebook: facebook,
      snapchat: snapchat,
      twitter: twitter,
    });

    alert('Opponent Profile has been updated!');
  };
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black' }}>
        <View style={{ marginTop: 0 }}>
          <Header
            backgroundColor="black"
            leftComponent={
              <Icon
                name="arrow-back"
                color="white"
                onPress={() => this.props.navigation.navigate('Home')}
              />
            }
            centerComponent={{
              text: 'Register as Rival',
              style: { color: 'white' },
            }}
          />
        </View>
        <ScrollView style={{ marginTop: -5, backgroundColor: 'black' }}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <TextInput
              placeholder="Sport"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              value={this.state.sport}
              onChangeText={(text) => {
                this.setState({
                  sport: text,
                });
              }}
              style={styles.input}
            />

            <TextInput
              placeholder=" Level Of Expertise"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              value={this.state.level}
              onChangeText={(text) => {
                this.setState({
                  level: text,
                });
              }}
              style={styles.input}
            />

            <TextInput
              placeholder="Add Bio"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              value={this.state.bio}
              onChangeText={(text) => {
                this.setState({
                  bio: text,
                });
              }}
              style={styles.inputExtraSpace}
            />

            <View style={{ marginTop: 20 }}></View>
            <View style={styles.contentView}>
              <Image
                style={styles.logo}
                source={{
                  uri: 'https://pngimg.com/uploads/instagram/instagram_PNG10.png',
                }}
              />

              <TextInput
                placeholder=" InstaGram"
                placeholderTextColor="#A9A3A3"
                multiline={false}
                value={this.state.insta}
                onChangeText={(text) => {
                  this.setState({
                    insta: text,
                  });
                }}
                style={styles.inputMedia}
              />
            </View>

            <View style={styles.contentView}>
              <Image
                style={styles.logo}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1000px-Snapchat_logo.svg.png',
                }}
              />

              <TextInput
                placeholder="SnapChat"
                placeholderTextColor="#A9A3A3"
                multiline={false}
                value={this.state.snapchat}
                onChangeText={(text) => {
                  this.setState({
                    snapchat: text,
                  });
                }}
                style={styles.inputMedia}
              />
            </View>

            <View style={styles.contentView}>
              <Image
                style={styles.logo}
                source={{
                  uri: 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png',
                }}
              />

              <TextInput
                placeholder="FaceBook"
                placeholderTextColor="#A9A3A3"
                multiline={false}
                value={this.state.facebook}
                onChangeText={(text) => {
                  this.setState({
                    facebook: text,
                  });
                }}
                style={styles.inputMedia}
              />
            </View>

            <View style={styles.contentView}>
              <Image
                style={styles.logo}
                source={{
                  uri: 'https://www.net-aware.org.uk/siteassets/images-and-icons/application-icons/app-icons-twitter.png?w=585&scale=down',
                }}
              />

              <TextInput
                placeholder="Twitter"
                placeholderTextColor="#A9A3A3"
                multiline={false}
                value={this.state.twitter}
                onChangeText={(text) => {
                  this.setState({
                    twitter: text,
                  });
                }}
                style={styles.inputMedia}
              />
            </View>

            <LinearGradient
              // Button Linear Gradient
              colors={['#5d34a5', '#482980']}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, { marginBottom: 10, marginTop: 30 }]}>
              <TouchableOpacity
                style={{
                  width: 300,
                  height: 50,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  {
                    this.state.isOppActive === true
                      ? this.updateForm(
                          this.state.userId,
                          this.state.sport,
                          this.state.level,
                          this.state.bio,
                          this.state.insta,
                          this.state.facebook,
                          this.state.snapchat,
                          this.state.twitter,
                          this.state.oppDocId
                        )
                      : this.submitForm(
                          this.state.sport,
                          this.state.level,
                          this.state.name,
                          this.state.age,
                          this.state.bio,
                          this.state.insta,
                          this.state.facebook,
                          this.state.snapchat,
                          this.state.twitter,
                          this.state.image,
                          this.state.userDocId
                        );
                  }
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {this.state.isOppActive === true ? 'UPDATE' : ' REGISTER'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    padding: 10,
    color: '#A9A3A3',
    backgroundColor: '#2A2A2A',
    width: '85%',
    margin: 10,
  },

  inputExtraSpace: {
    alignSelf: 'center',
    padding: 10,
    color: '#A9A3A3',
    backgroundColor: '#2A2A2A',
    width: '85%',
    margin: 10,
    height: 80,
  },

  inputMedia: {
    alignSelf: 'center',
    padding: 10,
    color: '#A9A3A3',
    backgroundColor: '#2A2A2A',
    width: '70%',
    margin: 10,
  },

  contentView: {
    marginTop: 10,
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logo: {
    marginTop: 10,
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
});
