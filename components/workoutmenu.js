import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import Swipeable from 'react-native-swipeable';
import { useNavigation } from '@react-navigation/native';

const WorkoutMenu = ({ workoutNumber, content, showProgress, onDeleteCallback }) => {
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

  const deleteWorkout = () => {
    onDeleteCallback(); // Call the callback to delete the item
  };

  return (
    <Swipeable rightButtons={[<DeleteButton onDeleteProp={deleteWorkout} />]} useNativeDriver={false}>
      <TouchableNativeFeedback onPress={navigateToWorkoutDetail}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Week: {workoutNumber}</Title>
              <Text style={{ fontSize: 12, color: 'gray' }}>{formattedDate}</Text>
              {showProgress && <Paragraph>Progress</Paragraph>}
              {showProgress && <ProgressBar progress={0.5} color={'blue'} />}
            </Card.Content>
          </Card>
        </View>
      </TouchableNativeFeedback>
    </Swipeable>
  );
};

// Separate component for delete button in the swipe action
const DeleteButton = ({ onDeleteProp }) => (
  <View style={styles.deleteButton}>
    <TouchableNativeFeedback onPress={onDeleteProp}>
      <Text style={{ color: 'white' }}>Delete</Text>
    </TouchableNativeFeedback>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },
  card: {
    borderRadius: 0,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});

export default WorkoutMenu;
