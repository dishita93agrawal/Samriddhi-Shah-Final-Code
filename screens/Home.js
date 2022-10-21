import * as React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import MyHeader from '../components/MyHeader';
export default class Home extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <View style={{ justifyContent: 'flex-start' }}>
          <MyHeader title="Home" navigation={this.props.navigation} />
        </View>

        <View
          style={{
            justifyContent: 'space-around',
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('OpponentTab');
            }}
            style={{
              height: '33%',
              width: '100%',
              position: 'relative',
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <ImageBackground
              source={{
                uri: 'https://i2-prod.walesonline.co.uk/incoming/article20876376.ece/ALTERNATES/s615/0_team.jpg',
              }}
              style={{
                height: '100%',
                width: '100%',
                opacity: 0.9,
                position: 'absolute',
              }}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,204,204,0.4)',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 23,
                  letterSpacing: 2,
                }}>
                FIND RIVALS
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CoachTab');
            }}
            style={{
              marginTop: 5,
              height: '33%',
              width: '100%',

              position: 'relative',
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <ImageBackground
              source={{
                uri: 'https://youthsportstrainer.com/wp-content/uploads/2020/04/coach-2.jpg',
              }}
              style={{
                height: '100%',
                width: '100%',
                opacity: 0.9,
                position: 'absolute',
              }}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,204,204,0.4)',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 23,
                  letterSpacing: 2,
                }}>
                {' '}
                FIND COACHES
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('EventTab');
            }}
            style={{
              marginTop: 5,
              height: '33%',
              width: '100%',

              position: 'relative',
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <ImageBackground
              source={{
                uri: 'https://www.ed.ac.uk/files/styles/landscape_breakpoints_theme_uoe_mobile_1x/public/thumbnails/image/gettyimages-1164591021.jpg?itok=seVeNZ4j',
              }}
              style={{
                height: '100%',
                width: '100%',
                opacity: 0.9,
                position: 'absolute',
              }}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,204,204,0.4)',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 23,
                  letterSpacing: 2,
                }}>
                {' '}
                JOIN EVENTS
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
