// ExerciseSection.js

import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SpecifiedWorkout from './specifiedworkout'; // Import the SpecifiedWorkout component

const ExerciseSection = ({ id, dayOfWeek }) => {
  console.log(id);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null); // Track selected exercise for modal

  const navigateToSpecifiedExercise = (exercise) => {
    setSelectedExercise(exercise); // Set the selected exercise for modal
    setExerciseModalVisible(true); // Open the modal
  };

  const handleSaveExercises = (exercises) => {
    setSelectedExercises(exercises);
  };

  const handleOpenModal = () => {
    setExerciseModalVisible(true);
  };

  const handleCloseModal = () => {
    setExerciseModalVisible(false);
    setSelectedExercise(null); // Clear the selected exercise when closing the modal
  };

  useEffect(() => {
    const loadSelectedWorkouts = async () => {
      try {
        // Load selected workouts for the specific day from AsyncStorage
        const savedSelectedWorkouts = await AsyncStorage.getItem(`selectedWorkouts_${dayOfWeek}`);
        if (savedSelectedWorkouts !== null) {
          setSelectedExercises(JSON.parse(savedSelectedWorkouts));
        }
      } catch (error) {
        console.error('Error loading selected workouts:', error);
      }
    };

    loadSelectedWorkouts();
  }, [dayOfWeek]);
  const ExerciseModal = ({ visible, onSave, onClose }) => {
    const [selectedExercises, setSelectedExercises] = useState([]);
    const exercises = [
      'Bench Press',
      'Incline Press',
      'Decline Press',
      'Tricep Extensions',
      'Squats',
      'Deadlifts',
      'Leg Extensions',
      'Pull-Ups',
    ];

    const handleSave = () => {
      onSave(selectedExercises);
      onClose();
    };

    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
        <Text style={styles.title} h1>Add Exercise</Text>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {exercises.map((exercise, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const newSelectedExercises = selectedExercises.includes(exercise)
                    ? selectedExercises.filter((ex) => ex !== exercise)
                    : [...selectedExercises, exercise];
                  setSelectedExercises(newSelectedExercises);
                  AsyncStorage.setItem(`selectedWorkouts_${id}_${dayOfWeek}`, JSON.stringify(newSelectedExercises));
                }}
              >
                <ListItem bottomDivider containerStyle={[styles.listItem, selectedExercises.includes(exercise) && styles.selectedItem]}>
                  <ListItem.Content>
                    <ListItem.Subtitle>{exercise}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button onPress={onClose} title="Cancel" buttonStyle={{ backgroundColor: 'black' }} color="black" />
            <Button onPress={handleSave} title="Save" buttonStyle={{ backgroundColor: 'black' }} color="black" />
          </View>
        </View>
      </Modal>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button onPress={handleOpenModal} buttonStyle={{ backgroundColor: 'black', borderRadius: 5 }}>
          Add Exercise
        </Button>
      </View>

      {/* Render selected exercises as cards */}
      {selectedExercises.map((exercise, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToSpecifiedExercise(exercise)}>
          <Card style={styles.card}>
            <Card.Content>
              <Text>{exercise}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}

      {/* Modal for specified workout */}
      <Modal visible={exerciseModalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            {/* Pass the route params to SpecifiedWorkout */}
            {selectedExercise && (
              <SpecifiedWorkout
                exercise={selectedExercise}
                dow={dayOfWeek}
                onClose={handleCloseModal} // Close the modal on SpecifiedWorkout's close action
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    // Your container styles
  },
  buttonRow: {
    // Your button row styles
  },
  card: {
    // Your card styles
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Align to the bottom
  },
  modalContainer: {
    height: windowHeight * 0.8, // Take 80% of the screen's height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});

export default ExerciseSection;
