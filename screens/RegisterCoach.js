import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { Header, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

export default class RegisterCoach extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,

      availability: "",
      experience: "",
      fee: "",
      name: "",
      sport: "",

      mobileNumber: "",
      gender: "",
      image: "",
      isCoachActive: null,
      userDocId: "",
      coachDocId: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          console.log(data);

          this.setState({
            name: doc.data().firstName + " " + doc.data().lastName,
            mobileNumber: doc.data().mobileNumber,
            gender: doc.data().gender,
            image: doc.data().image,
            isCoachActive: doc.data().isCoachActive,

            userDocId: doc.id,
          });
        });
      });

    db.collection("coach")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          console.log(data);
          this.setState({
            sport: doc.data().sport,
            availability: doc.data().availability,
            experience: doc.data().experience,
            fee: doc.data().fee,
            name: doc.data().name,

            ratings: [],
            mobileNumber: doc.data().mobileNumber,
            gender: doc.data().gender,
            coachDocId: doc.id,
          });
        });
      });
  };

  submitForm = (
    name,
    availability,
    experience,
    fee,
    sport,

    mobileNumber,
    gender,
    image,
    userDocId
  ) => {
    if (name && availability && experience && fee && sport && mobileNumber) {
      var userId = this.state.userId;
      db.collection("coach")
        .add({
          email: userId,
          name: name,
          availability: availability,
          experience: experience,
          fee: fee,
          sport: sport,

          mobileNumber: mobileNumber,
          gender: gender,
          image: image,
        })
        .then((docRef) => {
          // console.log(docRef.id);
        })

        .catch((error) => {
          // console.log(error);
        });

      db.collection("users")
        .where("email", "==", userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection("users").doc(userDocId).update({
              isCoachActive: true,
            });
          });
        });
      alert("You have successfully registered as a coach!");
    } else {
      alert("Please fill all the details!");
      return;
    }
  };

  updateForm = (userId, availability, experience, fee, sport, coachDocId) => {
    db.collection("coach").doc(coachDocId).update({
      sport: sport,
      experience: experience,

      availability: availability,
      fee: fee,
    });

    alert("Coach Profile has been updated!");
  };

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "black" }}
      >
      
          <Header
            backgroundColor="black"
            leftComponent={
              <Icon
                name="arrow-back"
                color="white"
                onPress={() => this.props.navigation.navigate("Home")}
              />
            }
            centerComponent={{
              text: "Register as a Coach",
              style: { color: "white" },
            }}
          />
          <ScrollView style={{ marginTop: -5, backgroundColor: "black" }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
              <View></View>

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
                placeholder=" Experience & Bio & Acomplishments"
                placeholderTextColor="#A9A3A3"
                multiline={true}
                value={this.state.experience}
                onChangeText={(text) => {
                  this.setState({
                    experience: text,
                  });
                }}
                style={styles.inputXtra}
              />

              <TextInput
                placeholder="Availible Time Slots"
                placeholderTextColor="#A9A3A3"
                value={this.state.availability}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    availability: text,
                  });
                }}
                style={styles.input}
              />

              <TextInput
                placeholder="Hourly fee in Rs."
                placeholderTextColor="#A9A3A3"
                value={this.state.fee}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    fee: text,
                  });
                }}
                style={styles.input}
              />

              <View style={{ marginTop: 20 }}></View>

              <LinearGradient
                // Button Linear Gradient
                colors={["#5d34a5", "#482980"]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, { marginBottom: 10, marginTop: 30 }]}
              >
                <TouchableOpacity
                  style={{
                    width: 300,
                    height: 50,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    {
                      this.state.isCoachActive === true
                        ? this.updateForm(
                            this.state.userId,
                            this.state.availability,
                            this.state.experience,
                            this.state.fee,
                            this.state.sport,

                            this.state.coachDocId
                          )
                        : this.submitForm(
                            this.state.name,
                            this.state.availability,
                            this.state.experience,
                            this.state.fee,
                            this.state.sport,

                            this.state.mobileNumber,
                            this.state.gender,
                            this.state.image,
                            this.state.userDocId
                          );
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {this.state.isCoachActive === true ? "UPDATE" : " REGISTER"}
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
    alignSelf: "center",
    padding: 10,
    color: "#A9A3A3",
    backgroundColor: "#2A2A2A",
    width: "85%",
    margin: 10,
  },

  inputXtra: {
    alignSelf: "center",
    padding: 10,
    color: "#A9A3A3",
    backgroundColor: "#2A2A2A",
    width: "85%",
    margin: 10,
    height: 150,
  },

  button: {
    width: "70%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
  },
});
