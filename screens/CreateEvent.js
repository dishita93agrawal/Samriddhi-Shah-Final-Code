import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";
import { Header, Icon, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import db from "../config";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo-linear-gradient";

export default class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      date: "",
      eventName: "",
      description: "",
      host: "",
      ageGroup: "",
      sport: "",
      pFee: "",

      facebook: "",
      insta: "",
      snapchat: "",

      venue: "",
      image: "https://ak.picdn.net/shutterstock/videos/1019638666/thumb/7.jpg",
      dateC: "",
      isDatePickerVisible: false,
    };
  }

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
    });
  };

  handleConfirm = (date) => {
    // console.log("A date has been picked: ", date);
    var newDate = date.toString();
    var slicedDate = newDate.slice(3, 15);
    this.setState({
      date: slicedDate,
    });
    this.hideDatePicker();
  };
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            host: doc.data().firstName + doc.data().lastName,
          });
        });
      });
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            username: doc.data().firstName,
          });
        });
      });
  };

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

  updateDetails = async (uri, imageName) => {
    try {
      var response = await fetch(uri);
      var blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child("event_pic/" + imageName);
      return ref.put(blob).then((response) => {
        this.fetchImage(imageName);
      });
    } catch (e) {
      // console.log(e);
    }
  };
  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("event_pic/" + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  addPNotification = (eventName, ageGroup, eventDate, userId) => {
    var msg = "New event has been scheduled. ";
    var date = moment().format("DD/MM/YYYY");
    var sentFrom = userId;
    var sentTo = "everyone";
    db.collection("notification").add({
      message: msg,
      date: date,
      sentFrom: sentFrom,
      sentTo: sentTo,
      notificationType: "event",
      open: "EventsScreen",
      status: "false",
    });

    alert("Event has been created. App Users will be notified soon.");
  };

  submitForm = (
    eventName,
    description,
    host,
    ageGroup,

    date,
    pFee,

    image,
    venue,
    sport
  ) => {
    if (
      eventName &&
      description &&
      host &&
      ageGroup &&
      date &&
      pFee &&
      image &&
      venue &&
      sport
    ) {
      var userId = this.state.userId;
      db.collection("events")
        .add({
          email: userId,
          eventName: eventName,
          description: description,
          host: host,
          ageGroup: ageGroup,

          date: date,
          participationFee: pFee,

          image: image,

          venue: venue,
          sport: sport,
        })
        .then((docRef) => {
          // console.log(docRef.id);
        })
        .catch((error) => {
          // console.log(error);
        });

      this.addPNotification(
        this.state.eventName,
        this.state.ageGroup,
        this.state.date,
        this.state.userId
      );
      alert("You have successfully created an Event");
    } else {
      alert("Please fill all the details!");
      return;
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
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
            text: "Create an Event",
            style: { color: "white" },
          }}
        />

        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView style={{ marginTop: -5, backgroundColor: "black" }}>
            <View
              style={{
                alignSelf: "center",
                alignContent: "center",
                marginTop: 15,
              }}
            >
              <Avatar
                source={{ uri: this.state.image }}
                size="xlarge"
                onPress={() => this.selectPicture()}
              />
            </View>
            <TextInput
              placeholder="Name of Event"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  eventName: text,
                });
              }}
              style={styles.input}
            />

            <TextInput
              placeholder="Sport"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  sport: text,
                });
              }}
              style={styles.input}
            />

            <TextInput
              placeholder="Description"
              multiline={true}
              placeholderTextColor="#A9A3A3"
              onChangeText={(text) => {
                this.setState({
                  description: text,
                });
              }}
              style={styles.inputExtraSpace}
            />

            <TextInput
              placeholder="Age Group"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              style={styles.input}
              onChangeText={(text) => {
                this.setState({
                  ageGroup: text,
                });
              }}
            />

            <TextInput
              placeholder="Venue"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              style={styles.input}
              onChangeText={(text) => {
                this.setState({
                  venue: text,
                });
              }}
            />

            <TextInput
              placeholder="Participation Fee"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              style={styles.input}
              onChangeText={(text) => {
                this.setState({
                  pFee: text,
                });
              }}
            />

            <TextInput
              placeholder="Date"
              placeholderTextColor="#A9A3A3"
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  date: text,
                });
              }}
              value={this.state.date}
              style={styles.input}
            />
            <TouchableOpacity onPress={this.showDatePicker}>
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                {" "}
                Select Date{" "}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />

            <LinearGradient
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
                  this.updateDetails(this.state.image, this.state.userId);
                  this.submitForm(
                    this.state.eventName,
                    this.state.description,
                    this.state.host,
                    this.state.ageGroup,

                    this.state.date,
                    this.state.pFee,

                    this.state.image,
                    this.state.venue,
                    this.state.sport
                  );
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  CREATE
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </KeyboardAvoidingView>
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

  inputExtraSpace: {
    alignSelf: "center",
    padding: 10,
    color: "#A9A3A3",
    backgroundColor: "#2A2A2A",
    width: "85%",
    margin: 10,
    height: 80,
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
