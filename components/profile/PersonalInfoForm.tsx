import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { Profile } from '@/types/profile';

interface PersonalInfoFormProps {
  data: Profile['personalInfo'];
  onChange: (field: keyof Profile['personalInfo'] | 'emergencyContact.name' | 'emergencyContact.relationship' | 'emergencyContact.phone', value: string) => void;
  errors?: {
    [K in keyof Profile['personalInfo']]?: K extends 'emergencyContact' 
      ? { name?: string; relationship?: string; phone?: string }
      : string;
  };
}

export default function PersonalInfoForm({ data, onChange, errors }: PersonalInfoFormProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Full Legal Name</Text>
          <TextInput
            style={[styles.input, errors?.fullName && styles.inputError]}
            value={data.fullName}
            onChangeText={(value) => onChange('fullName', value)}
            placeholder="Enter your full legal name"
          />
          {errors?.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={[styles.input, errors?.dateOfBirth && styles.inputError]}
            value={data.dateOfBirth}
            onChangeText={(value) => onChange('dateOfBirth', value)}
            placeholder="YYYY-MM-DD"
          />
          {errors?.dateOfBirth && (
            <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Current Address</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors?.address && styles.inputError]}
            value={data.address}
            onChangeText={(value) => onChange('address', value)}
            placeholder="Enter your current address"
            multiline
            numberOfLines={3}
          />
          {errors?.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors?.phone && styles.inputError]}
            value={data.phone}
            onChangeText={(value) => onChange('phone', value)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
          {errors?.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, errors?.email && styles.inputError]}
            value={data.email}
            onChangeText={(value) => onChange('email', value)}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors?.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Preferred Language</Text>
          <TextInput
            style={[styles.input, errors?.preferredLanguage && styles.inputError]}
            value={data.preferredLanguage}
            onChangeText={(value) => onChange('preferredLanguage', value)}
            placeholder="Enter your preferred language"
          />
          {errors?.preferredLanguage && (
            <Text style={styles.errorText}>{errors.preferredLanguage}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Gender Identity</Text>
          <TextInput
            style={[styles.input, errors?.gender && styles.inputError]}
            value={data.gender}
            onChangeText={(value) => onChange('gender', value)}
            placeholder="Enter your gender identity"
          />
          {errors?.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Marital Status</Text>
          <TextInput
            style={[styles.input, errors?.maritalStatus && styles.inputError]}
            value={data.maritalStatus}
            onChangeText={(value) => onChange('maritalStatus', value)}
            placeholder="Enter your marital status"
          />
          {errors?.maritalStatus && (
            <Text style={styles.errorText}>{errors.maritalStatus}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Contact Name</Text>
          <TextInput
            style={[styles.input, errors?.emergencyContact?.name && styles.inputError]}
            value={data.emergencyContact.name}
            onChangeText={(value) => onChange('emergencyContact.name', value)}
            placeholder="Enter emergency contact name"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Relationship</Text>
          <TextInput
            style={[styles.input, errors?.emergencyContact?.relationship && styles.inputError]}
            value={data.emergencyContact.relationship}
            onChangeText={(value) => onChange('emergencyContact.relationship', value)}
            placeholder="Enter relationship to emergency contact"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contact Phone</Text>
          <TextInput
            style={[styles.input, errors?.emergencyContact?.phone && styles.inputError]}
            value={data.emergencyContact.phone}
            onChangeText={(value) => onChange('emergencyContact.phone', value)}
            placeholder="Enter emergency contact phone"
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 12,
    marginTop: 4,
  },
});