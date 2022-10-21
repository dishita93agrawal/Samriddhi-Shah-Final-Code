import * as React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { Header, Icon } from "react-native-elements";

import firebase from "firebase";
import db from "../config";
export default class Notification extends React.Component {
  constructor() {
    super();
    this.state = {
      allNotification: [],
      userId: firebase.auth().currentUser.email,
    };
    this.nRef = null;
  }

  getAllNotifications = () => {
    this.nRef = db
      .collection("notification")
      .where("status", "==", "false")
      .where("sentTo", "in", [this.state.userId, "everyone"])

      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notifications = doc.data();
          allNotifications.push(notifications);
        });
        this.setState({
          allNotification: allNotifications,
        });
      });
  };

  componentDidMount() {
    this.getAllNotifications();
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <View>
        {item.notificationType === "opponent" ? (
          <TouchableOpacity
            style={{ marginTop: 2 }}
            onPress={() => {
              this.props.navigation.navigate("RequestProfile", {
                details: item,
              });
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(51, 50, 57, 0.5)",
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 10,
                paddingLeft: 20,
                borderRadius: 10,
              }}
            >
              <Icon
                name="people-outline"
                type="ionicon"
                size={30}
                color="white"
              />
              <View style={{ flexDirection: "column", marginLeft: 30 }}>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {item.sentFrom}
                </Text>
                <Text style={{ color: "white", fontSize: 12 }}>
                  {item.date}
                </Text>

                <Text style={{ color: "white", fontSize: 13 }}>
                  Incoming Rival Request
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ marginTop: 2 }}
            onPress={() => {
              this.props.navigation.navigate("EventTab");
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(51, 50, 57, 0.5)",
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 10,
                paddingLeft: 20,
                borderRadius: 10,
              }}
            >
              <Icon
                name="calendar"
                type="font-awesome"
                size={30}
                color="white"
              />
              <View style={{ flexDirection: "column", marginLeft: 30 }}>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {item.sentFrom}
                </Text>
                <Text style={{ color: "white", fontSize: 12 }}>
                  {item.date}
                </Text>
                <Text style={{ color: "white", fontSize: 13 }}>
                  New Event Scheduled
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 0 }}>
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
              text: "Notifications",
              style: { color: "white" },
            }}
          />
        </View>

        <View style={{ marginTop: -5, flex: 1, backgroundColor: "black" }}>
          {this.state.allNotification.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                {" "}
                Your notifications will come up here..!{" "}
              </Text>
            </View>
          ) : (
            <FlatList
              style={{
                margin: 2,
                padding: 2,
                color: "#3498DB",
              }}
              keyExtractor={this.keyExtractor}
              data={this.state.allNotification}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
