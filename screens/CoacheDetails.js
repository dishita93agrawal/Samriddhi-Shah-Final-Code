import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import moment from "moment";
import { AirbnbRating } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import { Header, Icon } from "react-native-elements";
export default class CoachDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: this.props.route.params.details["availability"],
      city: this.props.route.params.details["city"],
      email: this.props.route.params.details["email"],
      experience: this.props.route.params.details["experience"],
      fee: this.props.route.params.details["fee"],
      gender: this.props.route.params.details["gender"],
      mobileNumber: this.props.route.params.details["mobileNumber"],
      name: this.props.route.params.details["name"],
      socialMediaLink: this.props.route.params.details["socialMediaLink"],
      sport: this.props.route.params.details["sport"],
      website: this.props.route.params.details["website"],
      image: this.props.route.params.details["image"],
      rating: this.props.route.params.details["ratings"],
      age: "",
      myMobileNumber: 0,
      myName: "",
      myAge: 0,
      username: "",
      userId: firebase.auth().currentUser.email,
      feedback: "",
      coachDocId: "",
      avgRating: 0,
    };
    console.log(this.props.route.params.details);
  }

  componentDidMount() {
    this.getUserInfo();
    this.calAvgRating();
  }

  calAvgRating = () => {
    if (this.state.rating) {
      var ratingArray = this.state.rating;

      var total = 0;
      for (let i = 0; i < ratingArray.length; i++) {
        total += ratingArray[i];
      }

      // console.log('avg is=' + total / ratingArray.length);
      this.setState({
        avgRating: Math.round(total / ratingArray.length),
      });
    }
  };

  addNotification = (userId, email, name, username) => {
    var msg =
      username +
      " is interested in being coached from you. Please contact them.";
    var date = moment().format("DD/MM/YYYY");
    var sentFrom = userId;
    var sentTo = email;
    db.collection("notification").add({
      message: msg,
      date: date,
      sentFrom: sentFrom,
      sentTo: sentTo,
    });

    alert(
      "Request has been sent. Check for updates on the notifications page."
    );
  };

  getUserInfo = () => {
    db.collection("users")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            age: doc.data().age,
          });
        });
      });

    db.collection("coach")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            coachDocId: doc.id,
          });
        });
      });

    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            myMobileNumber: doc.data().mobileNumber,
            myName: doc.data().firstName + " " + doc.data().lastName,
            myAge: doc.data().age,
            username: doc.data().firstName,
          });
        });
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
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
            text: this.state.sport + " Coach",
            style: { color: "white" },
          }}
        />

        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "black",
            marginTop: -5,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              margin: 10,
              marginTop: 20,
              borderRadius: 5,
              borderColor: "grey",
              borderWidth: 0.5,
              alignItems: "center",
              width: "90%",
            }}
          >
            <Image
              style={{
                marginTop: 10,
                borderColor: "grey",
                borderWidth: 1,
                height: 200,
                width: "95%",
                resizeMode: "contain",
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
              source={{
                uri: this.state.image,
              }}
            />

            <View
              style={{
                margin: 10,

                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  flex: 0.7,
                }}
              >
                {this.state.name + ", " + this.state.age}
              </Text>

              <Text
                style={{
                  flex: 0.3,
                  color: "grey",
                  borderWidth: 1,
                  borderColor: "grey",
                  textAlign: "center",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                {this.state.fee}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "85%",
                margin: 10,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <LinearGradient
                colors={["#5d34a5", "#482980"]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 80,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    Linking.openURL(`tel:${this.state.mobileNumber}`);
                  }}
                >
                  <Icon
                    name="ios-call-outline"
                    type="ionicon"
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={["#5d34a5", "#482980"]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 80,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    Linking.openURL(
                      "mailto:" +
                        this.state.email +
                        "?subject=" +
                        "Interested in taking Coaching Lessons "
                    );
                  }}
                >
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
                color: "grey",
                fontSize: 16,
                margin: 10,
              }}
            >
              {this.state.experience}
            </Text>

            <View
              style={{
                paddingLeft: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 7,
                }}
              >
                <Icon name="md-time" type="ionicon" size={25} color="grey" />
                <Text
                  style={{
                    color: "grey",
                    opacity: 0.9,
                    fontSize: 14,
                    marginLeft: 5,
                    marginBottom: 2,
                    marginTop: 5,
                    textTransform: "uppercase",
                  }}
                >
                  {this.state.availability}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AirbnbRating
                  count={5}
                  selectedColor="#5d34a5"
                  defaultRating={this.state.avgRating}
                  isDisabled={true}
                  showRating={false}
                  size={20}
                />

                <TouchableOpacity
                  style={{ marginTop: 8, marginLeft: 50 }}
                  onPress={() => {
                    try {
                      this.props.navigation.navigate("RateCoach", {
                        coachEmail: this.state.email,
                        coachDocId: this.state.coachDocId,
                      });
                    } catch (e) {
                      // console.log(e)
                    }
                  }}
                >
                  <Icon
                    name="edit"
                    type="antdesign"
                    size={30}
                    color="#5d34a5"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
