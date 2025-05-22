export interface VaccinationRecord {
  id: string;
  vaccineName: string;
  dateAdministered: string;
  batchNumber: string;
  manufacturer: string;
  nextDueDate?: string;
  administeredBy: string;
  location: string;
  notes?: string;
  adverseReactions?: string[];
  documentUrls?: string[];
}

export interface GrowthRecord {
  id: string;
  date: string;
  height: number;
  weight: number;
  headCircumference?: number;
  bmi: number;
  heightPercentile: number;
  weightPercentile: number;
  headCircumferencePercentile?: number;
  notes?: string;
  recordedBy: string;
  location: string;
}

export interface DevelopmentalMilestone {
  id: string;
  category: 'motor' | 'cognitive' | 'social' | 'language';
  milestone: string;
  expectedAgeRange: string;
  dateAchieved?: string;
  notes?: string;
}

export interface HealthAlert {
  id: string;
  type: 'vaccination' | 'growth' | 'milestone' | 'general';
  title: string;
  description: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
  createdAt: string;
}

export interface MedicalProvider {
  id: string;
  name: string;
  specialty: string;
  facility: string;
  contact: string;
  address: string;
}

export interface PatientProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodType?: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContacts: {
    name: string;
    relationship: string;
    contact: string;
  }[];
  primaryProvider: MedicalProvider;
}