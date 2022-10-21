import * as React from 'react';

import {
  Text,
  View,
  
  Image,
  ScrollView,
} from 'react-native';

import { Header, Icon } from 'react-native-elements';

export default class About extends React.Component {
  constructor() {
    super();
    this.state = {
      choosenIndex: 0,
      language: '',
    };
  }

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
              onPress={() => this.props.navigation.navigate('Settings')}
            />
          }
          centerComponent={{
            text: 'About Us',
            style: { color: 'white' },
          }}
        />

        <ScrollView
          contentContainerStyle={{
            
            alignItems: 'center',
            backgroundColor: 'black',
          }}>
          <Image
            source={require('../assets/Logo1.png')}
            style={{
              width: 250,
              height: 250,
              alignSelf: 'center',
              marginBottom: 20,
              marginTop: 30,
            }}
          />

          <View
            style={{
              backgroundColor: 'rgba(51, 50, 57, 0.5)',
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 15,
              borderRadius: 5,
              color: '#A9A3A3',
              margin: 10,
            }}>
            <Text
              style={{ color: '#A9A3A3', lineHeight: 30, textAlign: 'center' }}>
              Children looking for ideal sports partners, sports coaches eager
              to connect with potential trainees/their parents, sports
              organisers looking for a platform from which to circulate
              information about upcoming events will be the ones to use my app.
              My app will solve the problems of apprehensive parents unable to
              find suitable opponents/coaches for their children. Coaches unable
              to find trainees will be able to do so through the app. It will
              enable event managers to disseminate information about upcoming
              events thereby increasing participation. Through my app, I wish to
              address the problems of children who have moved in recently into
              my city but are unable to find their ideal sports companions. Out
              of necessity, they may have to attend sports classes all alone.
              Lack of company may cause them to lose interest in their sports
              activity. Again, there may be parents who are unaware of the right
              place to send their children to for sports classes within their
              constrained budget and commuting range. They may not be sure how
              to contact the much needed coach to help their child. My app is
              likely to help all the people faced with the aforesaid problems.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
