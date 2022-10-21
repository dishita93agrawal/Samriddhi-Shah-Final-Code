import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Main from "./screens/Main";
import RegisterOpponents from "./screens/RegisterOpponents";
import FindOpponents from "./screens/FindOpponents";
import OpponentDetails from "./screens/OpponentDetails";
import RegisterCoach from "./screens/RegisterCoach";
import CoacheDetails from "./screens/CoacheDetails";
import FindCoaches from "./screens/FindCoaches";
import RateCoach from "./screens/RateCoach";
import FindEvent from "./screens/FindEvent";
import EventDetail from "./screens/EventDetail";
import CreateEvent from "./screens/CreateEvent";
import RequestProfile from "./screens/RequestProfile";

import Feedback from "./screens/Feedback";
import Settings from "./screens/Settings";
import Notifications from "./screens/Notifications";
import Edit from "./screens/Edit";
import About from "./screens/About";

import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={StackNavigatorHome} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const HomeStack = createStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OpponentTab" component={AppTabNavigatorOpponent} />
      <Stack.Screen name="CoachTab" component={AppTabNavigatorCouches} />

      <Stack.Screen name="EventTab" component={AppTabNavigatorEvents} />
      <Stack.Screen name="Settings" component={StackNavigatorSettings} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="RequestProfile" component={RequestProfile} />
    </Stack.Navigator>
  );
};

const SettingsStack = createStackNavigator();

const StackNavigatorSettings = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="About" component={About} />
      <SettingsStack.Screen name="Feedback" component={Feedback} />
      <SettingsStack.Screen name="Edit" component={Edit} />
    </SettingsStack.Navigator>
  );
};

const OTab = createBottomTabNavigator();
const AppTabNavigatorOpponent = () => {
  return (
    <OTab.Navigator
      initialRouteName="RegisterOpponents"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "RegisterOpponents") {
            iconName = "md-person-add-outline";
          } else if (route.name === "FindOpponents") {
            iconName = "people";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: "#291749" },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "black",
      }}
    >
      <OTab.Screen
        name="RegisterOpponents"
        component={RegisterOpponents}
        options={{
          tabBarLabel: "Register as Opponent",
          headerShown: false,
        }}
      />
      <OTab.Screen
        name="FindOpponents"
        component={StackNavigatorFo}
        options={{
          tabBarLabel: "Find Opponent",
          headerShown: false,
        }}
      />
    </OTab.Navigator>
  );
};
const FOStack = createStackNavigator();

const StackNavigatorFo = () => {
  return (
    <FOStack.Navigator
      initialRouteName="FindOpponents"
      screenOptions={{
        headerShown: false,
      }}
    >
      <FOStack.Screen name="FindOpponents" component={FindOpponents} />
      <FOStack.Screen name="OpponentDetails" component={OpponentDetails} />
    </FOStack.Navigator>
  );
};

const CTab = createBottomTabNavigator();
const AppTabNavigatorCouches = () => {
  return (
    <CTab.Navigator
      initialRouteName="RegisterCoach"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "RegisterCoach") {
            iconName = "ios-person-add-sharp";
          } else if (route.name === "FindCoaches") {
            iconName = "people";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: "#291749" },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "black",
      }}
    >
      <CTab.Screen
        name="RegisterCoach"
        component={RegisterCoach}
        options={{
          tabBarLabel: "Register as coach ",
          headerShown: false,
        }}
      />
      <CTab.Screen
        name="FindCoaches"
        component={StackNavigatorFc}
        options={{
          tabBarLabel: "Find coach ",
          headerShown: false,
        }}
      />
    </CTab.Navigator>
  );
};
const FCStack = createStackNavigator();

const StackNavigatorFc = () => {
  return (
    <FCStack.Navigator
      initialRouteName="FindCoaches"
      screenOptions={{
        headerShown: false,
      }}
    >
      <FCStack.Screen name="FindCoaches" component={FindCoaches} />
      <FCStack.Screen name="CoachDetails" component={CoacheDetails} />
      <FCStack.Screen name="RateCoach" component={RateCoach} />
    </FCStack.Navigator>
  );
};

const ETab = createBottomTabNavigator();
const AppTabNavigatorEvents = () => {
  return (
    <ETab.Navigator
      initialRouteName="CreateEvent"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "CreateEvent") {
            iconName = "ios-person-add-sharp";
          } else if (route.name === "FindCoaches") {
            iconName = "people";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: "#291749" },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "black",
      }}
    >
      <ETab.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          tabBarLabel: "Create a Event ",
          headerShown: false,
        }}
      />
      <ETab.Screen
        name="FindEvent"
        component={StackNavigatorFv}
        options={{
          tabBarLabel: "Find Events ",
          headerShown: false,
        }}
      />
    </ETab.Navigator>
  );
};
const FEStack = createStackNavigator();

const StackNavigatorFv = () => {
  return (
    <FEStack.Navigator
      initialRouteName="FindEvent"
      screenOptions={{
        headerShown: false,
      }}
    >
      <FEStack.Screen name="FindEvent" component={FindEvent} />
      <FEStack.Screen name="EventDetail" component={EventDetail} />
    </FEStack.Navigator>
  );
};
