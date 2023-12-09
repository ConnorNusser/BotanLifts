// specifiedworkout.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Button as ThemedButton } from '@rneui/themed'; // Import Button from themed

const SpecifiedWorkout = ({ exercise, dow, onClose }) => {
  // Implement your SpecifiedWorkout component's functionality here
  const titleHeader = exercise ? `${exercise}` : 'Workout Details'; // Title based on exercise prop

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{titleHeader}</Text>
      </View>
      <Text>Training Max: {dow}</Text>
      <ThemedButton style={styles.addButton} onPress={() => console.log('Add Workout pressed')}>
        Add Sets
      </ThemedButton>
      <Button title="Close" onPress={onClose} />
      {/* Add workout details or actions related to the specified exercise */}
      {/* ... */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'black',
    marginTop: 20,
  },
});

export default SpecifiedWorkout;
