import React, {useState} from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup } from '@rneui/themed'
import  ExerciseSection from './exercisesection'
const WorkoutDetailScreen = ({ route }) => {
  const { workoutNumber, content } = route.params;
  const daysOfWeek = ['Sa', 'M', 'T', 'W', 'T', 'F', 'Su'];
  const [selectedIndex, setSelectedIndex] = useState();
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
      <ExerciseSection daysOfWeek= {daysOfWeek[selectedIndex]}/>
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
