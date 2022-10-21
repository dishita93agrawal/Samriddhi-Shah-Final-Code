import * as React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import firebase from 'firebase';
import db from '../config';
import { Header, Icon, Avatar } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';

export default class FindCoach extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      coach: [],
      search: '',
      dataSource: [],
      userSport: '',  
    };
    this.requestRef = null;
    this.sportRef = null;
  }

  getCoach = () => {
    this.requestRef = db.collection('coach').where('email','!=',this.state.userId).onSnapshot((snapshot) => {
      // console.log(snapshot)
      var coachList = snapshot.docs.map((document) => { 
        // console.log(document.data())
        return document.data()});
      this.setState({
        coach: coachList,
      });
    });
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.coach.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.sport ? item.sport.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  componentDidMount = () => {
    this.getCoach();
  };

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <TouchableOpacity
        style={{ marginTop: 2 }}
        onPress={() => {
          this.props.navigation.navigate('CoachDetails', {
            details: item,
          });
        }}>
        <View
          style={{
            backgroundColor: 'rgba(51, 50, 57, 0.5)',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 10,
            paddingLeft: 20,
            borderRadius: 10,
          }}>
          <Avatar rounded size="medium" source={{ uri: item.image }} />
          <View style={{ flexDirection: 'column', marginLeft: 30 }}>
            <Text style={{ color: 'white', fontSize: 17 }}>{item.name}</Text>
            <Text style={{ color: 'white', fontSize: 15 }}>{item.sport}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
     
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
              text: 'Find a  Coach',
              style: { color: 'white' },
            }}
          />
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
            <View>
              {this.state.coach.length === 0 ? (
                <View>
                  <Text> List of Requested Items </Text>
                </View>
              ) : (
                <View>
                  <FlatList
                    style={{
                      margin: 2,
                      borderRadius: 3,
                      padding: 2,
                      color: '#3498DB',
                    }}
                    keyExtractor={this.keyExtractor}
                    data={
                      this.state.search === ''
                        ? this.state.coach
                        : this.state.dataSource
                    }
                    renderItem={this.renderItem}
                  />
                </View>
              )}
            </View>
 
      </View>
    );
  }
}
