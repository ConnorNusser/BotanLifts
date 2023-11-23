import React, {useState} from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup } from '@rneui/themed'

const WorkoutDetailScreen = ({ route }) => {
  const { workoutNumber, content } = route.params;
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectedIndex, setSelectedIndex] = useState(0);
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
      <Text>Workout Number: {workoutNumber}</Text>
      <Text>Content: {content}</Text>
      {/* ... Other workout details */}
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
