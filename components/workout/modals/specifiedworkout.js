import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button as ThemedButton } from '@rneui/themed'; // Import Button from themed

const SpecifiedWorkout = ({ exercise, dow, onClose }) => {
  const titleHeader = exercise ? `${exercise}` : 'Workout Details';
  const closeModal = () => {
    console.log(onClose);
    onClose();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{titleHeader}</Text>
      </View>
      <Text>Training Max: {dow}</Text>
      <ThemedButton style={styles.addButton} onPress={() => console.log('Add Workout pressed')}>
        Add Sets
      </ThemedButton>
      <ThemedButton style={styles.closeButton} onPress={closeModal}>
        Close
      </ThemedButton>
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
  closeButton: {
    backgroundColor: 'red',
    marginTop: 20,
  },
});

export default SpecifiedWorkout;
