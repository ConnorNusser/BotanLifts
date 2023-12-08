// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpecifiedWorkout = ({route}) => {
    const {dow, exercise} = route.params;
    console.log(dow);
    console.log(exercise)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen!</Text>
      {/* Add your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SpecifiedWorkout;
