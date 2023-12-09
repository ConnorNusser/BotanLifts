import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import WorkoutMenu from './workoutmenu';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        setWorkouts(storedComponents);
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
    const updatedWorkouts = [newWorkout, ...workouts];
    setWorkouts(updatedWorkouts);
    saveComponentsToStorage(updatedWorkouts);
  };

  const deleteWorkout = (id) => {
    // Remove the workout item based on its ID
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(updatedWorkouts);
    saveComponentsToStorage(updatedWorkouts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.levelIndicator}>
          <MaterialCommunityIcons name="numeric-1-box" size={24} color="#000" />
          <Text style={styles.levelText}>Level 1</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={workoutSetCreate} style={styles.createButton}>
            Add Cycle +
          </Button>
        </View>
      </View>
      <ScrollView>
        {workouts.map((workout, index) => {
          const isLastItem = index === 0;
          return (
            <View style={[styles.scrollViewItem, isLastItem && styles.lastItem]} key={workout.id}>
              <WorkoutMenu
                id = {workout.id}
                workoutNumber={workout.workoutNumber}
                content={workout.content}
                showProgress={isLastItem}
                onDeleteCallback={() => deleteWorkout(workout.id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewItem: {
    borderBottomColor: '#ccc',
  },
  lastItem: {
    marginBottom: 60,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  createButton: {
    minWidth: 100,
  },
  levelIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default HomeScreen;
