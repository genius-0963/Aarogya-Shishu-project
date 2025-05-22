import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';

// Components
import VaccinationTimeline from '@/components/vaccination/VaccinationTimeline';

export default function VaccinationsScreen() {
  const [activeFilter, setActiveFilter] = useState('upcoming');
  
  const filters = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'all', label: 'All' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === filter.id && styles.activeFilterButtonText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <VaccinationTimeline filter={activeFilter} />

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.light.success + '20' }]}>
            <CheckCircle size={16} color={Colors.light.success} />
          </View>
          <Text style={styles.legendText}>Completed</Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.light.primary + '20' }]}>
            <Clock size={16} color={Colors.light.primary} />
          </View>
          <Text style={styles.legendText}>Upcoming</Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.light.warning + '20' }]}>
            <AlertCircle size={16} color={Colors.light.warning} />
          </View>
          <Text style={styles.legendText}>Overdue</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add Vaccination Record</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.guideButton}>
          <Text style={styles.guideButtonText}>Vaccination Guide</Text>
          <ArrowRight size={16} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  activeFilterButton: {
    backgroundColor: Colors.light.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  actionContainer: {
    padding: 16,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  guideButtonText: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});