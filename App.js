import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme, TouchableOpacity, Text} from 'react-native';

import WorkoutScreen from './components/workoutscreen.js';
import Settings from './components/screens/settings.js';
import Home from './components/home.js';
import WorkoutDetailScreen from './components/workoutdetailscreen.js';
import WorkoutList from './components/screens/workoutlist.js';
import Profile from './components/screens/profile.js';
import SpecifiedWorkout from './components/workout/specifiedworkout.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WorkoutStack = () => {
  const colorScheme = useColorScheme();
  const arrowColor = colorScheme === 'dark' ? '#fff' : '#000'; // Set arrow color based on theme

  return (
    <Stack.Navigator>
    <Stack.Screen
      name="Workouts"
      component={WorkoutScreen}
    />
    <Stack.Screen
      name="WorkoutDetailScreen"
      options={({ navigation }) => ({
        headerTitle: 'Details',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={arrowColor} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        ),
      })}
    >
      {() => (
        <Stack.Navigator>
          <Stack.Screen 
            name="WorkoutDetailScreen"
            component={WorkoutDetailScreen}
          />
          <Stack.Screen 
            name="SpecifiedWorkout"
            component={SpecifiedWorkout}
          />
        </Stack.Navigator>
      )}
    </Stack.Screen>
  </Stack.Navigator>
  );
};

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
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
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
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;


/*
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
*/