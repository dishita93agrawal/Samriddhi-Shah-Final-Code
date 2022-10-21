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
import * as ImagePicker from 'expo-image-picker';
import { Header, Icon, Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
export default class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      age: 0,
      gender: '',
      userId: firebase.auth().currentUser.email,
      image: '#',
      docID: '',
      wing: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.setState({ image: uri });
    }
  };
  getUserInfo = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            docID: doc.id,
            image: doc.data().image,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            mobileNumber: doc.data().mobileNumber,
            age: doc.data().age,
            gender: doc.data().gender,
            wing: doc.data().wing,
          });
        });
      });
  };

  updateDetails = async (uri, imageName) => {
    try {
      if(uri!=="#"){
      var response = await fetch(uri);
      var blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child('user_profiles/' + imageName);
      return ref.put(blob).then((response) => {
        this.fetchImage(imageName);
      });
      }else{
      db.collection('users').doc(this.state.docID).update({
          firstName: this.state.firstName,
          age: this.state.age,
          gender: this.state.gender,
          lastName: this.state.lastName,
          image: this.state.image,
          mobileNumber: this.state.mobileNumber,
          wing: this.state.wing,
        });
        alert('Profile updated');
      }
    } catch (e) {
      // console.log(e);
    }
  };
  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection('users').doc(this.state.docID).update({
          firstName: this.state.firstName,
          age: this.state.age,
          gender: this.state.gender,
          lastName: this.state.lastName,
          image: this.state.image,
          mobileNumber: this.state.mobileNumber,
          wing: this.state.wing,
        });
        alert('Profile updated');
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black' }}>
        <ImageBackground
          style={styles.background}
          source={{
            uri: '',
          }}>
          <View style={{ marginTop: 0 }}>
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
                text: 'Edit Profile',
                style: { color: 'white' },
              }}
            />
          </View>
          <ScrollView style={{ marginTop: -5, backgroundColor: 'black' }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
              <View>
                <Avatar
                  rounded
                  source={{ uri: this.state.image }}
                  size="xlarge"
                  onPress={() => this.selectPicture()}
                  containerStyle={styles.imageContainer}
                />
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#A9A3A3"
                  value={this.state.firstName}
                  onChangeText={(text) => {
                    this.setState({
                      firstName: text,
                    });
                  }}
                  style={styles.inputFirst}
                />

                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="#A9A3A3"
                  value={this.state.lastName}
                  onChangeText={(text) => {
                    this.setState({
                      lastName: text,
                    });
                  }}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Gender"
                  placeholderTextColor="#A9A3A3"
                  value={this.state.gender}
                  onChangeText={(text) => {
                    this.setState({
                      gender: text,
                    });
                  }}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Mobile Number"
                  placeholderTextColor="#A9A3A3"
                  value={this.state.mobileNumber}
                  onChangeText={(text) => {
                    this.setState({
                      mobileNumber: text,
                    });
                  }}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Age "
                  placeholderTextColor="#A9A3A3"
                  keyboardType="numeric"
                  value={this.state.age}
                  onChangeText={(text) => {
                    this.setState({
                      age: text,
                    });
                  }}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Flat Address "
                  placeholderTextColor="#A9A3A3"
                  multiline={true}
                  value={this.state.wing}
                  onChangeText={(text) => {
                    this.setState({
                      wing: text,
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
                        this.updateDetails(this.state.image, this.state.userId);
                      }}>
                      <Text style={styles.btnTxt}>UPDATE</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  input: {
    alignSelf: 'center',
    padding: 10,
    color: '#A9A3A3',
    backgroundColor: '#2A2A2A',
    width: '85%',
    margin: 12,
  },

  inputFirst: {
    alignSelf: 'center',
    padding: 10,
    color: '#A9A3A3',
    backgroundColor: '#2A2A2A',
    width: '85%',
    margin: 12,
    marginTop: 60,
  },

  imageContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },

  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
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
