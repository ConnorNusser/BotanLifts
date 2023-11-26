import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import { Button } from '@rneui/themed';

const ExerciseSection = () => {
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
          <ScrollView contentContainerStyle={styles.scrollView}>
            {exercises.map((exercise, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (selectedExercises.includes(exercise)) {
                    setSelectedExercises(selectedExercises.filter((ex) => ex !== exercise));
                  } else {
                    setSelectedExercises([...selectedExercises, exercise]);
                  }
                }}
              >
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Subtitle style={[styles.exerciseItem, selectedExercises.includes(exercise) && styles.selectedItem]}>
                      {exercise}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
          <Button onPress={onClose}>Cancel</Button>
        <Button onPress={handleSave}>Save</Button>
      </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button onPress={handleOpenModal} buttonStyle={{
                backgroundColor: 'black',
                borderRadius: 5,
              }}>Add Exercise</Button>
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
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  cardModal: {
    marginHorizontal: 5,
    borderRadius: 0,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default ExerciseSection;
