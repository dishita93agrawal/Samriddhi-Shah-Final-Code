import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SearchBar } from "react-native-elements";

import firebase from "firebase";
import db from "../config";
import { Header, Icon, Avatar } from "react-native-elements";

export default class FindOpponents extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      opponents: [],
      userSport: "",
      search: "",
      dataSource: [],
    };
    this.requestRef = null;
    this.sportRef = null;
  }

  getOpponents = () => {
    this.requestRef = db.collection("opponents").onSnapshot((snapshot) => {
      var opponentsList = snapshot.docs.map((document) => document.data());
      this.setState({
        opponents: opponentsList,
      });
    });
  };

  componentDidMount = () => {
    this.getOpponents();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.opponents.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.sport ? item.sport.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <TouchableOpacity
        style={{ marginTop: 2 }}
        onPress={() => {
          this.props.navigation.navigate("OpponentDetails", {
            details: item,
          });
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(51, 50, 57, 0.5)",
            flex: 1,
            flexDirection: "row",
            padding: 10,
            paddingLeft: 20,
            borderRadius: 10,
          }}
        >
          <Avatar rounded size="medium" source={{ uri: item.image }} />
          <View style={{ flexDirection: "column", marginLeft: 30 }}>
            <Text style={{ color: "white", fontSize: 17 }}>
              {item.playername}
            </Text>
            <Text style={{ color: "white", fontSize: 15 }}>{item.sport}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { search } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
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
              text: "Find Rivals",
              style: { color: "white" },
            }}
          />
        </View>
        <View
          style={{ backgroundColor: "black", marginBottom: 10, marginTop: -5 }}
        >
          <SearchBar
            round
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            cancelIconColor="#c6c6c6"
            searchIcon={{ size: 24 }}
            heightAdjust="0"
            placeholder="Type Sport name"
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.search}
          />

          {this.state.opponents.length === 0 ? (
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center",
                  marginTop: 30,
                }}
              >
                {" "}
                List of Requested Items{" "}
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={
                this.state.search === ""
                  ? this.state.opponents
                  : this.state.dataSource
              }
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
