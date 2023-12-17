import React, { useState } from 'react';
import { View, Modal, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from 'react-native-elements';
import { exerciseList } from '../../constants/exerciselist';

const AddExerciseModal = ({ id, dow, visible, onSave, onClose }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleSave = () => {
    onSave(selectedExercises);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Add Exercise</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {exerciseList.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                const newSelectedExercises = selectedExercises.includes(exercise)
                  ? selectedExercises.filter((ex) => ex !== exercise)
                  : [...selectedExercises, exercise];
                setSelectedExercises(newSelectedExercises);
                AsyncStorage.setItem(`selectedWorkouts_${id}_${dow}`, JSON.stringify(newSelectedExercises));
              }}
            >
              <ListItem
                bottomDivider
                containerStyle={[styles.listItem, selectedExercises.includes(exercise) && styles.selectedItem]}
              >
                <ListItem.Content>
                  <ListItem.Subtitle style={styles.listItemText}>{exercise}</ListItem.Subtitle>
                </ListItem.Content>
                {selectedExercises.includes(exercise) && (
                  <Text style={styles.checkmark}>{'\u2713'}</Text>
                )}
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


const styles = StyleSheet.create({
    title: {
        paddingBottom: 10
    },
    modalContainer: {
      paddingTop: 100,
      paddingHorizontal: 20, // Adjust this padding as needed
      backgroundColor: 'white',
      flex: 1,
    },
    listItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectedItem: {
      backgroundColor: '#e6e6e6', // Background color when an exercise is selected
    },
    listItemText: {
      fontSize: 16,
    },
    checkmark: {
      fontSize: 20,
      color: 'green', // Color for the checkmark, modify as needed
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 100,
    },
  });
  

export default AddExerciseModal;
