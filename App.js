import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WorkoutScreen from './components/workoutscreen.js';
import Settings from './components/settings.js';
import Home from './components/home.js';
import WorkoutDetailScreen from './components/workoutdetailscreen.js';
import WorkoutList from './components/workoutlist.js';
import Profile from './components/profile.js'; // Add your Profile component import

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WorkoutStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Workouts" component={WorkoutScreen} />
    <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
  </Stack.Navigator>
);

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profile',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
      }}
    />
    <ProfileStack.Screen name="Settings" component={Settings} />
  </ProfileStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Workout"
          component={WorkoutStack}
          options={{
            tabBarLabel: 'Workout',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Workout List"
          component={WorkoutList}
          options={{
            tabBarLabel: 'Workout List',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
