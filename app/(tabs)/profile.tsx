import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import { Profile, ProfileSchema } from '@/types/profile';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>({
    id: '123',
    personalInfo: {
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01T00:00:00.000Z',
      address: '123 Main St, City, State 12345',
      phone: '(555) 123-4567',
      email: 'john.doe@example.com',
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '(555) 987-6543',
      },
      preferredLanguage: 'English',
      gender: 'Male',
      maritalStatus: 'Married',
    },
    children: [],
    healthcareProvider: {
      id: '456',
      name: 'Dr. Smith',
      practice: 'Family Medical Center',
      address: '456 Health Ave, City, State 12345',
      phone: '(555) 234-5678',
      fax: '(555) 234-5679',
      specialty: 'Family Medicine',
    },
    insurance: {
      provider: 'Health Insurance Co',
      policyNumber: '123456789',
      groupNumber: 'GRP123456',
    },
    pharmacy: {
      name: 'City Pharmacy',
      location: '789 Drug St, City, State 12345',
      phone: '(555) 345-6789',
    },
    privacySettings: {
      profileVisibility: 'private',
      sharingPreferences: {
        healthcareProviders: true,
        familyMembers: true,
        emergencyContacts: true,
        insuranceCompanies: true,
      },
      communicationPreferences: {
        email: true,
        phone: true,
        text: true,
      },
      marketingPreferences: false,
      dataRetention: '3years',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePersonalInfoChange = (field: keyof Profile['personalInfo'], value: string) => {
    setProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));

    // Validate the updated field
    try {
      ProfileSchema.parse(profile);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({
          ...prev,
          [field]: error.message,
        }));
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PersonalInfoForm
        data={profile.personalInfo}
        onChange={handlePersonalInfoChange}
        errors={errors}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
});