import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LiftingChart from './liftingchart.js';

const Profile = () => {
  const navigation = useNavigation();
  const userStats = {
    workoutsCompleted: 23,
    level: 3,
    avatar: 'https://via.placeholder.com/150',
    maxLifts: {
      benchPress: '225 lbs',
      squat: '315 lbs',
      deadlift: '405 lbs',
      totalWeight: '945 lbs',
    },
  };
const benchPressData = [120, 130, 140, 150, 155, 160]; // Bench Press data over 6 months
const deadliftData = [180, 190, 200, 210, 215, 220]; // Deadlift data over 6 months
const squatData = [150, 160, 170, 180, 185, 190]; // Squat data over 6 months

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={120} source={{ uri: userStats.avatar }} />
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level {userStats.level}</Text>
            <Icon name="slack" type="font-awesome" color="blue" />
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Workouts Completed: {userStats.workoutsCompleted}</Text>
          {/* Add more stats here */}
        </View>
        <View styles={styles.buttonProfileSpacing}>
        <Button title="View Workouts" onPress={() => {}} style={styles.viewWorkoutsButton} />
        </View>
        <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        style={styles.settingsButton}
        />
      </Card>

      <Card style={styles.maxLiftsCard}>
        <Card.Title title="Max Lifts" />
        <Card.Content>
          <View style={styles.liftsContainer}>
            <View style={styles.liftItem}>
              <Text>Bench Press:</Text>
              <Text>{userStats.maxLifts.benchPress}</Text>
            </View>
            <View style={styles.liftItem}>
              <Text>Squat:</Text>
              <Text>{userStats.maxLifts.squat}</Text>
            </View>
            <View style={styles.liftItem}>
              <Text>Deadlift:</Text>
              <Text>{userStats.maxLifts.deadlift}</Text>
            </View>
            <View style={styles.liftItem}>
              <Text>Total Weight Lifted:</Text>
              <Text>{userStats.maxLifts.totalWeight}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
        <View style={styles.liftChartContainer}>
      <LiftingChart title="Bench Press Progress Over Time" data={benchPressData} />
      </View>
        {/* LiftingChart component for Deadlift */}
        <View style={styles.liftChartContainer}>
        <LiftingChart title="Deadlift Progress Over Time" data={deadliftData} />
        </View>
        <View style={styles.liftChartContainer}>
        {/* LiftingChart component for Squat */}
        <LiftingChart title="Squat Progress Over Time" data={squatData} />
        </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonProfileSpacing: {
    paddingBottom: 10
  },
  card: {
    width: '90%',
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  levelText: {
    marginRight: 5,
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsText: {
    marginBottom: 5,
  },
  maxLiftsCard: {
    width: '90%',
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  liftsContainer: {
    width: '100%',
  },
  liftItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  liftChartContainer : {
    paddingTop: 20
  },
  viewWorkoutsButton: {
    paddingBottom: 2, // Adjust as needed
  },
});

export default Profile;
