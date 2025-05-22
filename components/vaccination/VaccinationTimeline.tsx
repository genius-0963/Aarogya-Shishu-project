import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle, Info } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type VaccinationStatus = 'completed' | 'upcoming' | 'overdue';

interface Vaccination {
  id: string;
  name: string;
  shortName: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: VaccinationStatus;
}

interface VaccinationTimelineProps {
  filter: string;
}

const getStatusIcon = (status: VaccinationStatus) => {
  switch (status) {
    case 'completed':
      return <CheckCircle size={20} color={Colors.light.success} />;
    case 'upcoming':
      return <Clock size={20} color={Colors.light.primary} />;
    case 'overdue':
      return <AlertCircle size={20} color={Colors.light.warning} />;
    default:
      return <Clock size={20} color={Colors.light.primary} />;
  }
};

const getStatusColor = (status: VaccinationStatus) => {
  switch (status) {
    case 'completed':
      return Colors.light.success;
    case 'upcoming':
      return Colors.light.primary;
    case 'overdue':
      return Colors.light.warning;
    default:
      return Colors.light.primary;
  }
};

export default function VaccinationTimeline({ filter }: VaccinationTimelineProps) {
  const vaccinations = useMemo<Vaccination[]>(() => [
    { 
      id: '1', 
      name: 'Hepatitis B', 
      shortName: 'HepB', 
      description: 'First dose', 
      dueDate: '2023-06-01', 
      completedDate: '2023-06-01', 
      status: 'completed' 
    },
    { 
      id: '2', 
      name: 'Rotavirus', 
      shortName: 'RV', 
      description: 'First dose', 
      dueDate: '2023-06-15', 
      completedDate: '2023-06-14', 
      status: 'completed' 
    },
    { 
      id: '3', 
      name: 'Diphtheria, Tetanus, & Pertussis', 
      shortName: 'DTaP', 
      description: 'First dose', 
      dueDate: '2023-06-15', 
      completedDate: '2023-06-14', 
      status: 'completed' 
    },
    { 
      id: '4', 
      name: 'Haemophilus influenzae type b', 
      shortName: 'Hib', 
      description: 'First dose', 
      dueDate: '2023-06-15', 
      completedDate: '2023-06-14', 
      status: 'completed' 
    },
    { 
      id: '5', 
      name: 'Pneumococcal conjugate', 
      shortName: 'PCV13', 
      description: 'First dose', 
      dueDate: '2023-06-15', 
      completedDate: '2023-06-14', 
      status: 'completed' 
    },
    { 
      id: '6', 
      name: 'Inactivated Poliovirus', 
      shortName: 'IPV', 
      description: 'First dose', 
      dueDate: '2023-06-15', 
      completedDate: '2023-06-14', 
      status: 'completed' 
    },
    { 
      id: '7', 
      name: 'Hepatitis B', 
      shortName: 'HepB', 
      description: 'Second dose', 
      dueDate: '2023-07-15', 
      completedDate: '2023-07-12', 
      status: 'completed' 
    },
    { 
      id: '8', 
      name: 'Rotavirus', 
      shortName: 'RV', 
      description: 'Second dose', 
      dueDate: '2023-08-15', 
      status: 'upcoming' 
    },
    { 
      id: '9', 
      name: 'Diphtheria, Tetanus, & Pertussis', 
      shortName: 'DTaP', 
      description: 'Second dose', 
      dueDate: '2023-08-15', 
      status: 'upcoming' 
    },
    { 
      id: '10', 
      name: 'Haemophilus influenzae type b', 
      shortName: 'Hib', 
      description: 'Second dose', 
      dueDate: '2023-08-15', 
      status: 'upcoming' 
    },
    { 
      id: '11', 
      name: 'Pneumococcal conjugate', 
      shortName: 'PCV13', 
      description: 'Second dose', 
      dueDate: '2023-08-15', 
      status: 'upcoming' 
    },
    { 
      id: '12', 
      name: 'Inactivated Poliovirus', 
      shortName: 'IPV', 
      description: 'Second dose', 
      dueDate: '2023-08-15', 
      status: 'upcoming' 
    },
    { 
      id: '13', 
      name: 'Influenza (Flu)', 
      shortName: 'Flu', 
      description: 'First dose', 
      dueDate: '2023-07-01', 
      status: 'overdue' 
    },
  ], []);

  const filteredVaccinations = useMemo(() => {
    if (filter === 'all') return vaccinations;
    if (filter === 'upcoming') return vaccinations.filter(v => v.status === 'upcoming' || v.status === 'overdue');
    if (filter === 'completed') return vaccinations.filter(v => v.status === 'completed');
    return vaccinations;
  }, [vaccinations, filter]);

  // Group vaccinations by month
  const groupedVaccinations = useMemo(() => {
    const grouped: Record<string, Vaccination[]> = {};
    
    filteredVaccinations.forEach(vaccination => {
      const date = new Date(vaccination.dueDate);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(vaccination);
    });
    
    return grouped;
  }, [filteredVaccinations]);

  if (filteredVaccinations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No vaccinations found for the selected filter.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Object.entries(groupedVaccinations).map(([monthYear, monthVaccinations]) => (
        <View key={monthYear} style={styles.monthContainer}>
          <Text style={styles.monthTitle}>{monthYear}</Text>
          
          <View style={styles.timelineContainer}>
            {monthVaccinations.map((vaccination, index) => (
              <TouchableOpacity
                key={vaccination.id}
                style={styles.vaccinationItem}
                onPress={() => {/* Handle press */}}
              >
                <View style={styles.timelineLeft}>
                  <View 
                    style={[
                      styles.timelineDot, 
                      { backgroundColor: getStatusColor(vaccination.status) }
                    ]} 
                  />
                  {index < monthVaccinations.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                
                <View style={styles.vaccinationCard}>
                  <View style={styles.vaccinationHeader}>
                    <View style={styles.vaccineNameContainer}>
                      <Text style={styles.vaccineName}>{vaccination.name}</Text>
                      <Text style={styles.vaccineShortName}>({vaccination.shortName})</Text>
                    </View>
                    {getStatusIcon(vaccination.status)}
                  </View>
                  
                  <Text style={styles.vaccineDescription}>{vaccination.description}</Text>
                  
                  <View style={styles.vaccineDateContainer}>
                    {vaccination.status === 'completed' ? (
                      <Text style={styles.vaccineCompletedDate}>
                        Completed: {new Date(vaccination.completedDate!).toLocaleDateString()}
                      </Text>
                    ) : (
                      <Text 
                        style={[
                          styles.vaccineDueDate,
                          vaccination.status === 'overdue' && styles.vaccineOverdueDate
                        ]}
                      >
                        Due: {new Date(vaccination.dueDate).toLocaleDateString()}
                      </Text>
                    )}
                    
                    <TouchableOpacity 
                      style={styles.infoButton}
                      onPress={() => {/* Show vaccine info */}}
                    >
                      <Info size={16} color={Colors.light.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  monthContainer: {
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
    marginLeft: 24,
  },
  timelineContainer: {
    paddingLeft: 8,
  },
  vaccinationItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    zIndex: 1,
  },
  timelineLine: {
    position: 'absolute',
    top: 16,
    bottom: -12,
    width: 2,
    backgroundColor: Colors.light.border,
    left: 7,
  },
  vaccinationCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  vaccinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  vaccineNameContainer: {
    flex: 1,
    paddingRight: 8,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  vaccineShortName: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  vaccineDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  vaccineDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vaccineCompletedDate: {
    fontSize: 14,
    color: Colors.light.success,
  },
  vaccineDueDate: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  vaccineOverdueDate: {
    color: Colors.light.warning,
    fontWeight: '500',
  },
  infoButton: {
    padding: 4,
  },
});