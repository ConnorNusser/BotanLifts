import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const WorkoutMenu = ({ workoutNumber, content, showProgress }) => {
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
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },
  card: {
    borderRadius: 0, // Set border radius to 0 to remove rounded corners
  },
});

export default WorkoutMenu;
