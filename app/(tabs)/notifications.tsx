import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Clock, Settings, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function NotificationsScreen() {
  const [vaccinationReminders, setVaccinationReminders] = useState(true);
  const [growthReminders, setGrowthReminders] = useState(true);
  const [milestoneAlerts, setMilestoneAlerts] = useState(true);
  const [healthTips, setHealthTips] = useState(true);
  
  const upcomingReminders = [
    {
      id: '1',
      title: 'DTaP Vaccination Due',
      description: 'Diphtheria, Tetanus & Pertussis vaccination is due in 7 days',
      date: '2023-08-15',
      type: 'vaccination',
    },
    {
      id: '2',
      title: 'Growth Check Reminder',
      description: 'Time to record Emma\'s monthly growth measurements',
      date: '2023-08-10',
      type: 'growth',
    },
    {
      id: '3',
      title: 'Upcoming Milestone: Walking',
      description: 'Most children start walking between 12-15 months',
      date: '2023-08-20',
      type: 'milestone',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.light.primary + '20' }]}>
              <Bell size={20} color={Colors.light.primary} />
            </View>
            <View>
              <Text style={styles.preferenceTitle}>Vaccination Reminders</Text>
              <Text style={styles.preferenceDescription}>Reminders for upcoming and overdue vaccinations</Text>
            </View>
          </View>
          <Switch
            value={vaccinationReminders}
            onValueChange={setVaccinationReminders}
            trackColor={{ false: Colors.light.border, true: Colors.light.primary + '70' }}
            thumbColor={vaccinationReminders ? Colors.light.primary : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.light.secondary + '20' }]}>
              <Clock size={20} color={Colors.light.secondary} />
            </View>
            <View>
              <Text style={styles.preferenceTitle}>Growth Check Reminders</Text>
              <Text style={styles.preferenceDescription}>Monthly reminders to record growth measurements</Text>
            </View>
          </View>
          <Switch
            value={growthReminders}
            onValueChange={setGrowthReminders}
            trackColor={{ false: Colors.light.border, true: Colors.light.primary + '70' }}
            thumbColor={growthReminders ? Colors.light.primary : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.light.accent + '20' }]}>
              <Bell size={20} color={Colors.light.accent} />
            </View>
            <View>
              <Text style={styles.preferenceTitle}>Milestone Alerts</Text>
              <Text style={styles.preferenceDescription}>Notifications about upcoming developmental milestones</Text>
            </View>
          </View>
          <Switch
            value={milestoneAlerts}
            onValueChange={setMilestoneAlerts}
            trackColor={{ false: Colors.light.border, true: Colors.light.primary + '70' }}
            thumbColor={milestoneAlerts ? Colors.light.primary : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.light.success + '20' }]}>
              <Bell size={20} color={Colors.light.success} />
            </View>
            <View>
              <Text style={styles.preferenceTitle}>Health Tips & Updates</Text>
              <Text style={styles.preferenceDescription}>Seasonal health tips and important updates</Text>
            </View>
          </View>
          <Switch
            value={healthTips}
            onValueChange={setHealthTips}
            trackColor={{ false: Colors.light.border, true: Colors.light.primary + '70' }}
            thumbColor={healthTips ? Colors.light.primary : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Reminders</Text>
        
        {upcomingReminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderItem}>
            <View style={styles.reminderInfo}>
              <View 
                style={[
                  styles.iconContainer, 
                  { 
                    backgroundColor: 
                      reminder.type === 'vaccination' ? Colors.light.primary + '20' :
                      reminder.type === 'growth' ? Colors.light.secondary + '20' :
                      Colors.light.accent + '20'
                  }
                ]}
              >
                <Bell 
                  size={20} 
                  color={
                    reminder.type === 'vaccination' ? Colors.light.primary :
                    reminder.type === 'growth' ? Colors.light.secondary :
                    Colors.light.accent
                  } 
                />
              </View>
              <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <Text style={styles.reminderDescription}>{reminder.description}</Text>
                <Text style={styles.reminderDate}>
                  {new Date(reminder.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingsButton}>
          <View style={styles.settingsButtonContent}>
            <Settings size={20} color={Colors.light.text} />
            <Text style={styles.settingsButtonText}>Advanced Notification Settings</Text>
          </View>
          <ChevronRight size={20} color={Colors.light.textSecondary} />
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
  section: {
    marginBottom: 24,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  reminderItem: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reminderInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  reminderDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  reminderDate: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginLeft: 12,
  },
});