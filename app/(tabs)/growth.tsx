import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Plus, ChartBar as BarChart, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import GrowthChart from '@/components/growth/GrowthChart';
import GrowthForm from '@/components/growth/GrowthForm';

export default function GrowthScreen() {
  const [activeMetric, setActiveMetric] = useState('weight');
  const [showForm, setShowForm] = useState(false);
  
  const metrics = [
    { id: 'weight', label: 'Weight' },
    { id: 'height', label: 'Height' },
    { id: 'head', label: 'Head Circumference' },
  ];

  const handleAddEntry = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Growth Charts</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddEntry}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Entry</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metricsContainer}>
        {metrics.map((metric) => (
          <TouchableOpacity
            key={metric.id}
            style={[
              styles.metricButton,
              activeMetric === metric.id && styles.activeMetricButton,
            ]}
            onPress={() => setActiveMetric(metric.id)}
          >
            <Text
              style={[
                styles.metricButtonText,
                activeMetric === metric.id && styles.activeMetricButtonText,
              ]}
            >
              {metric.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartContainer}>
        <GrowthChart metric={activeMetric} />
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryHeader}>
          <BarChart size={20} color={Colors.light.primary} />
          <Text style={styles.summaryTitle}>Growth Summary</Text>
        </View>
        
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Last Entry</Text>
            <Text style={styles.summaryValue}>
              {activeMetric === 'weight' ? '10.2 kg' : 
               activeMetric === 'height' ? '75.5 cm' : '46.2 cm'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Percentile</Text>
            <Text style={styles.summaryValue}>
              {activeMetric === 'weight' ? '65th' : 
               activeMetric === 'height' ? '72nd' : '58th'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Change</Text>
            <Text style={[styles.summaryValue, styles.positiveChange]}>
              {activeMetric === 'weight' ? '+0.4 kg' : 
               activeMetric === 'height' ? '+1.2 cm' : '+0.5 cm'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.milestonesContainer}>
        <Text style={styles.milestonesTitle}>Recent Milestones</Text>
        
        <View style={styles.milestoneItem}>
          <View style={styles.milestoneIconContainer}>
            <Check size={16} color={Colors.light.success} />
          </View>
          <View style={styles.milestoneContent}>
            <Text style={styles.milestoneName}>First Steps</Text>
            <Text style={styles.milestoneDate}>August 10, 2023</Text>
          </View>
        </View>
        
        <View style={styles.milestoneItem}>
          <View style={styles.milestoneIconContainer}>
            <Check size={16} color={Colors.light.success} />
          </View>
          <View style={styles.milestoneContent}>
            <Text style={styles.milestoneName}>First Word</Text>
            <Text style={styles.milestoneDate}>July 28, 2023</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All Milestones</Text>
        </TouchableOpacity>
      </View>

      {showForm && (
        <GrowthForm onClose={handleCloseForm} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  metricsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  metricButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  activeMetricButton: {
    backgroundColor: Colors.light.primary,
  },
  metricButtonText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  activeMetricButtonText: {
    color: 'white',
  },
  chartContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    height: 250,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 8,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  positiveChange: {
    color: Colors.light.success,
  },
  milestonesContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  milestonesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  milestoneIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 4,
  },
  milestoneDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  viewAllButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
});