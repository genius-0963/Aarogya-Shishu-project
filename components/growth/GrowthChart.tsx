import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '@/constants/Colors';

interface GrowthChartProps {
  metric: string;
}

export default function GrowthChart({ metric }: GrowthChartProps) {
  // In a real app, this would be a proper chart library implementation
  // For this example, we'll create a basic visual representation
  
  const chartData = useMemo(() => {
    if (metric === 'weight') {
      return [
        { month: 'Jun', value: 9.2, percentile: 62 },
        { month: 'Jul', value: 9.8, percentile: 64 },
        { month: 'Aug', value: 10.2, percentile: 65 },
      ];
    } else if (metric === 'height') {
      return [
        { month: 'Jun', value: 72.5, percentile: 70 },
        { month: 'Jul', value: 74.3, percentile: 71 },
        { month: 'Aug', value: 75.5, percentile: 72 },
      ];
    } else {
      return [
        { month: 'Jun', value: 45.1, percentile: 55 },
        { month: 'Jul', value: 45.7, percentile: 57 },
        { month: 'Aug', value: 46.2, percentile: 58 },
      ];
    }
  }, [metric]);

  // Calculate max value for chart scaling
  const maxValue = Math.max(...chartData.map(item => item.value)) * 1.2;
  
  // Generate WHO percentile lines (simplified)
  const percentileLines = [
    { label: '95th', percent: 0.95 },
    { label: '75th', percent: 0.75 },
    { label: '50th', percent: 0.5 },
    { label: '25th', percent: 0.25 },
    { label: '5th', percent: 0.05 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.yAxis}>
        {[0, 1, 2, 3, 4].map((index) => (
          <Text key={index} style={styles.yAxisLabel}>
            {Math.round(maxValue - (index * (maxValue / 4)))}
            {metric === 'weight' ? ' kg' : ' cm'}
          </Text>
        ))}
      </View>

      <View style={styles.chartContent}>
        {/* Horizontal grid lines */}
        {[0, 1, 2, 3, 4].map((index) => (
          <View 
            key={index} 
            style={[
              styles.gridLine, 
              { top: `${index * 25}%` }
            ]} 
          />
        ))}
        
        {/* Percentile lines - in a real app, these would be curved */}
        {percentileLines.map((line) => (
          <View 
            key={line.label} 
            style={[
              styles.percentileLine, 
              { 
                top: `${(1 - line.percent) * 100}%`,
                borderColor: line.label === '50th' ? Colors.light.primary : Colors.light.border,
                borderWidth: line.label === '50th' ? 1.5 : 0.5,
              }
            ]} 
          >
            <Text style={styles.percentileLabel}>{line.label}</Text>
          </View>
        ))}

        {/* Data points */}
        <View style={styles.dataPointsContainer}>
          {chartData.map((point, index) => {
            // Calculate point position relative to the max value
            const heightPercent = (point.value / maxValue) * 100;
            
            return (
              <View key={index} style={styles.dataPointColumn}>
                <View 
                  style={[
                    styles.dataPoint, 
                    { bottom: `${heightPercent}%` },
                  ]}
                >
                  <View style={styles.dataPointDot} />
                  <Text style={styles.dataPointValue}>
                    {point.value} {metric === 'weight' ? 'kg' : 'cm'}
                  </Text>
                </View>
                <Text style={styles.monthLabel}>{point.month}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingVertical: 16,
  },
  yAxisLabel: {
    fontSize: 10,
    color: Colors.light.textSecondary,
  },
  chartContent: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.light.border + '50',
  },
  percentileLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    borderStyle: 'dashed',
  },
  percentileLabel: {
    position: 'absolute',
    right: 0,
    top: -8,
    fontSize: 8,
    color: Colors.light.textTertiary,
  },
  dataPointsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    height: '100%',
  },
  dataPointColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    flex: 1,
  },
  dataPoint: {
    position: 'absolute',
    alignItems: 'center',
  },
  dataPointDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
    borderWidth: 2,
    borderColor: 'white',
  },
  dataPointValue: {
    fontSize: 10,
    color: Colors.light.text,
    marginTop: 2,
  },
  monthLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },
});