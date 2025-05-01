import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';

export const LineChart = () => {
  // Mock data for the chart
  const data = [65, 70, 68, 72, 76, 74, 78];
  
  // Chart dimensions
  const width = Dimensions.get('window').width - 64;
  const height = 150;
  const paddingRight = 30;
  const paddingLeft = 10;
  const paddingTop = 10;
  const paddingBottom = 30;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  // Calculate points
  const xStep = chartWidth / (data.length - 1);
  const yMin = Math.min(...data) - 5;
  const yMax = Math.max(...data) + 5;
  const yRange = yMax - yMin;
  
  // Create path
  let path = '';
  const points = data.map((value, index) => {
    const x = paddingLeft + index * xStep;
    const y = paddingTop + chartHeight - ((value - yMin) / yRange) * chartHeight;
    if (index === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
    return { x, y };
  });
  
  // Days of the week
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* X-axis */}
        <Line
          x1={paddingLeft}
          y1={paddingTop + chartHeight}
          x2={paddingLeft + chartWidth}
          y2={paddingTop + chartHeight}
          stroke="#E5E5E5"
          strokeWidth="1"
        />
        
        {/* Path for the line chart */}
        <Path
          d={path}
          fill="none"
          stroke="#4A90E2"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#FFFFFF"
            stroke="#4A90E2"
            strokeWidth="2"
          />
        ))}
      </Svg>
      
      {/* X-axis labels */}
      <View style={styles.xLabels}>
        {days.map((day, index) => (
          <Text key={index} style={styles.label}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 30,
  },
  label: {
    color: '#8E8E93',
    fontSize: 12,
    textAlign: 'center',
  },
});