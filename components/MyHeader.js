import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount() {
    this.getUnreadNotification();
  }
  BellIconWBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#ffffff"
          size={25}
          onPress={() => this.props.navigation.navigate('Notifications')}
        />
      </View>
    );
  };
  getUnreadNotification() {
    db.collection('notifications')
      .where('status', '==', 'unread')
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({
          value: unreadNotifications.length,
        });
      });
  }

  render() {
    return (
      <View style={{ marginTop: 0, borderBottomWidth: 0 }}>
        <Header
          backgroundColor="black"
          leftComponent={
            <Icon
              name="settings"
              color="white"
              onPress={() => this.props.navigation.navigate('Settings')}
            />
          }
          centerComponent={{
            text: this.props.title,
            style: { color: 'white' },
          }}
          rightComponent={<this.BellIconWBadge {...this.props} />}
        />
      </View>
    );
  }
}
