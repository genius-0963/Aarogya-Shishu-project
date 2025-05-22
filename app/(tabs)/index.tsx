import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ArrowRight, Calendar, Activity } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useMemo } from 'react';

export default function HomeScreen() {
  const upcomingVaccinations = useMemo(() => [
    { id: '1', name: 'MMR', dueDate: '2023-08-15', description: 'Measles, Mumps, Rubella' },
    { id: '2', name: 'DTaP', dueDate: '2023-09-05', description: 'Diphtheria, Tetanus, Pertussis' },
  ], []);

  const recentGrowthData = useMemo(() => {
    return {
      weight: { value: '10.2', unit: 'kg', percentile: 65 },
      height: { value: '75.5', unit: 'cm', percentile: 72 },
      headCircumference: { value: '46.2', unit: 'cm', percentile: 58 },
      date: '2023-07-25',
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3933031/pexels-photo-3933031.jpeg?auto=compress&cs=tinysrgb&w=600' }}
          style={styles.childImage}
        />
        <View style={styles.childInfo}>
          <Text style={styles.childName}>Emma Johnson</Text>
          <Text style={styles.childAge}>1 year, 3 months</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Vaccinations</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
            <ArrowRight size={16} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>

        {upcomingVaccinations.map((vaccine) => (
          <View key={vaccine.id} style={styles.vaccinationCard}>
            <View style={styles.vaccinationIcon}>
              <Calendar size={24} color={Colors.light.primary} />
            </View>
            <View style={styles.vaccinationInfo}>
              <Text style={styles.vaccineName}>{vaccine.name}</Text>
              <Text style={styles.vaccineDescription}>{vaccine.description}</Text>
              <Text style={styles.vaccineDueDate}>
                Due: {new Date(vaccine.dueDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Growth</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See details</Text>
            <ArrowRight size={16} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.growthCard}>
          <View style={styles.growthHeader}>
            <Activity size={24} color={Colors.light.primary} />
            <Text style={styles.growthDate}>
              {new Date(recentGrowthData.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </Text>
          </View>
          
          <View style={styles.growthMetrics}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{recentGrowthData.weight.value} {recentGrowthData.weight.unit}</Text>
              <Text style={styles.metricLabel}>Weight</Text>
              <View style={styles.percentileContainer}>
                <Text style={styles.percentile}>{recentGrowthData.weight.percentile}th</Text>
                <Text style={styles.percentileLabel}>percentile</Text>
              </View>
            </View>
            
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{recentGrowthData.height.value} {recentGrowthData.height.unit}</Text>
              <Text style={styles.metricLabel}>Height</Text>
              <View style={styles.percentileContainer}>
                <Text style={styles.percentile}>{recentGrowthData.height.percentile}th</Text>
                <Text style={styles.percentileLabel}>percentile</Text>
              </View>
            </View>
            
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{recentGrowthData.headCircumference.value} {recentGrowthData.headCircumference.unit}</Text>
              <Text style={styles.metricLabel}>Head</Text>
              <View style={styles.percentileContainer}>
                <Text style={styles.percentile}>{recentGrowthData.headCircumference.percentile}th</Text>
                <Text style={styles.percentileLabel}>percentile</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: Colors.light.primaryLight }]}>
              <Calendar size={24} color={Colors.light.primary} />
            </View>
            <Text style={styles.quickActionText}>Add Vaccination</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: Colors.light.secondaryLight }]}>
              <Activity size={24} color={Colors.light.secondary} />
            </View>
            <Text style={styles.quickActionText}>Record Growth</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.card,
    marginBottom: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  childImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  childAge: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginRight: 4,
  },
  vaccinationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  vaccinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  vaccinationInfo: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  vaccineDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  vaccineDueDate: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  growthCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  growthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  growthDate: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginLeft: 12,
  },
  growthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  percentileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentile: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
    marginRight: 4,
  },
  percentileLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickAction: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
});