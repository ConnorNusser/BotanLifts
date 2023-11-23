import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const WorkoutMenu = ({ workoutid, workoutNumber, content }) => {
  const navigation = useNavigation();

  const navigateToWorkoutDetail = () => {
    navigation.navigate('WorkoutDetail', { workoutNumber, content });
  };

  const today = new Date();
  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  const formattedDate = formatDate(today);

  return (
    <TouchableNativeFeedback onPress={navigateToWorkoutDetail}>
      <View style={styles.cardContainer}>
        <Card>
          <Card.Content>
            <Title>Workout: {workoutNumber}</Title>
            <Text style={{ fontSize: 12, color: 'gray' }}>{formattedDate}</Text>
            <Paragraph>Progress</Paragraph>
            <ProgressBar progress={0.5} color={'blue'} />
          </Card.Content>
        </Card>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});

export default WorkoutMenu;
