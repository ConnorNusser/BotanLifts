// ExerciseSection.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddExerciseModal from './modals/addexercisemodal';
import { ScrollView } from 'react-native-gesture-handler';
import { SpecifiedWorkoutModal } from './modals/specifiedworkoutmodal';

const ExerciseSection = ({ id, dayOfWeek }) => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
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
    setAddExerciseModalVisible(true);
  };

  const handleCloseAddExerciseModal = () => {
    setAddExerciseModalVisible(false);
    setSelectedExercise(null); // Clear the selected exercise when closing the modal
  };

  const handleCloseSpecifiedExerciseWorkoutModal = () => {
    setExerciseModalVisible(false);
  }

  useEffect(() => {
    const loadSelectedWorkouts = async () => {
      try {
        // Load selected workouts for the specific day from AsyncStorage
        const savedSelectedWorkouts = await AsyncStorage.getItem(`selectedWorkouts_${id}_${dayOfWeek}`);
        if (savedSelectedWorkouts !== null) {
          setSelectedExercises(JSON.parse(savedSelectedWorkouts));
        }else{
          setSelectedExercises([]);
        }

      } catch (error) {
        console.error('Error loading selected workouts:', error);
      }
    };

    loadSelectedWorkouts();
  }, [dayOfWeek]);
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button onPress={handleOpenModal} buttonStyle={{ backgroundColor: 'black', borderRadius: 5 }}>
          Add Exercise
        </Button>
      </View>
    <ScrollView contentContainerStyle={styles.cardContainerExercise}>
      {selectedExercises.map((exercise, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToSpecifiedExercise(exercise)}>
          <Card style={styles.card}>
            <Card.Content>
              <Text>{exercise}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      </ScrollView>
        <SpecifiedWorkoutModal id={id} dow={dayOfWeek} visible={exerciseModalVisible} onClose={handleCloseSpecifiedExerciseWorkoutModal} windowHeight={windowHeight} selectedExercise={selectedExercise}/> 
        <AddExerciseModal id={id} dow={dayOfWeek} visible={addExerciseModalVisible} onClose={handleCloseAddExerciseModal} onSave={handleSaveExercises}/>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    // Your container styles
  },
  buttonRow: {
    paddingBottom: 10
  },
  cardContainerExercise: {
    alignItems: 'center',
  },
  card: {
    marginBottom: 8,
    width: windowWidth * 0.8, // Set card width to 80% of the screen width
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Align to the bottom
  },
  modalContainer: {
    height: windowHeight * 0.6, // Take 80% of the screen's height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});

export default ExerciseSection;
