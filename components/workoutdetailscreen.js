import React from 'react';
import { View, Text } from 'react-native';

const WorkoutDetailScreen = ({ route }) => {
  const { workoutNumber, content } = route.params;

  return (
    <View>
      <Text>Workout Number: {workoutNumber}</Text>
      <Text>Content: {content}</Text>
      {/* ... Other workout details */}
    </View>
  );
};

export default WorkoutDetailScreen;
