// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import WorkoutMenu from './workoutmenu'
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const HomeScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currValue, setValue] = useState(0);

  useEffect(() => {
    loadStoredComponents();
  }, []);

  const loadStoredComponents = async () => {
    try {
      const storedComponentsJSON = await AsyncStorage.getItem('storedComponents');
      if (storedComponentsJSON !== null) {
        const storedComponents = JSON.parse(storedComponentsJSON);
        setWorkouts(storedComponents); // Set components directly from AsyncStorage
      }
    } catch (error) {
      console.error('Error loading stored components:', error);
    }
  };

  const saveComponentsToStorage = async (updatedComponents) => {
    try {
      const componentsJSON = JSON.stringify(updatedComponents);
      await AsyncStorage.setItem('storedComponents', componentsJSON);
    } catch (error) {
      console.error('Error saving components to storage:', error);
    }
  };

  const workoutSetCreate = () => {
    setValue(currValue + 1);
    const newWorkout = { id: uuidv4(), workoutNumber: currValue, content: currValue };
    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    saveComponentsToStorage(updatedWorkouts);
  }
  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={workoutSetCreate} style={styles.createButton}>
              Add Workout +
          </Button>
        </View>
        <Text>{currValue}</Text>
        <ScrollView>
        {workouts.map((workout, index) => (
            <View style={styles.scrollViewItem} key={workout.id}>
              <WorkoutMenu key={workout.id} workoutNumber={workout.workoutNumber} content={workout.content} />
            </View>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewItem: {
      paddingBottom: 10, // Add padding to each scroll view item
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomColor: '#ccc',
    },
    buttonContainer : {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: 20, // Add some padding from the right
      height: '10%',
    }, 
    createButton: {
      minWidth: 100, // Set minimum width for the button
    },
  });

export default HomeScreen;
