import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import { Button } from '@rneui/themed';
import { Text } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseSection = ({dayOfWeek}) => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleSaveExercises = (exercises) => {
    setSelectedExercises(exercises);
  };

  const handleOpenModal = () => {
    setExerciseModalVisible(true);
  };

  const handleCloseModal = () => {
    setExerciseModalVisible(false);
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
                  AsyncStorage.setItem(`selectedWorkouts_${dayOfWeek}`, JSON.stringify(newSelectedExercises));
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

      {selectedExercises.map((exercise, index) => (
        <TouchableOpacity key={index}>
          <Card style={styles.card}>
            <Card.Content>
              <Text>{exercise}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}

      <ExerciseModal
        visible={exerciseModalVisible}
        onSave={handleSaveExercises}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonRow: {
    marginBottom: 10,
  },
  exerciseButton: {
    width: '100%',
    maxWidth: 200,
  },
  card: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: '20%',
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: '10%',
  },
  title: {
    paddingTop: '40%',
    paddingLeft: 20
  }
});

export default ExerciseSection;
