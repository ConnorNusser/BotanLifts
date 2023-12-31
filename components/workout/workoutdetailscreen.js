import React, {useState} from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup } from '@rneui/themed'
import  ExerciseSection from './exercisesection.js'
const WorkoutDetailScreen = ({ route }) => {
  const {id, workoutNumber, content} = route.params;
  console.log(id);
  const daysOfWeek = ['Sa', 'M', 'T', 'W', 'T', 'F', 'Su'];
  const currentDayIndex = new Date().getDay();
  const [selectedIndex, setSelectedIndex] = useState(currentDayIndex);
  return (
    <View>
        <ButtonGroup
        buttons={daysOfWeek}
        selectedIndex={selectedIndex}
        onPress={(value) => {
            setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
        />
      <ExerciseSection id={id} dayOfWeek={daysOfWeek[selectedIndex]}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center', // Center the buttons horizontally
      flexWrap: 'wrap', // Allow buttons to wrap if the container width is exceeded
    },
    button: {
      margin: 5,
      width: 40, // Set a fixed width for the buttons
    },
  });
export default WorkoutDetailScreen;

