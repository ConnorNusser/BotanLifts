import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';

const LiftingChart = ({ title, data }) => {
  return (
    <Card>
      <Card.Content>
        <Text>{title}</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data }],
          }}
          width={300}
          height={200}
          yAxisSuffix="lbs"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          }}
          bezier
        />
      </Card.Content>
    </Card>
  );
};

export default LiftingChart;
