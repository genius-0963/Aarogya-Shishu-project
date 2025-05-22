import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(1),
  relationship: z.string().min(1),
  phone: z.string().min(10),
});

export const ChildSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1),
  dateOfBirth: z.string().datetime(),
  gender: z.string(),
  relationship: z.enum(['biological', 'adopted', 'step-child', 'other']),
  livingArrangement: z.string(),
  schoolInfo: z.string().optional(),
  specialNeeds: z.string().optional(),
  medicalConditions: z.array(z.string()).optional(),
  custodyArrangements: z.string().optional(),
});

export const HealthcareProviderSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  practice: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(10),
  fax: z.string().optional(),
  specialty: z.string().optional(),
});

export const InsuranceSchema = z.object({
  provider: z.string().min(1),
  policyNumber: z.string().min(1),
  groupNumber: z.string().optional(),
});

export const PharmacySchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  phone: z.string().min(10),
});

export const PrivacySettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'friends', 'private']),
  sharingPreferences: z.object({
    healthcareProviders: z.boolean(),
    familyMembers: z.boolean(),
    emergencyContacts: z.boolean(),
    insuranceCompanies: z.boolean(),
  }),
  communicationPreferences: z.object({
    email: z.boolean(),
    phone: z.boolean(),
    text: z.boolean(),
  }),
  marketingPreferences: z.boolean(),
  dataRetention: z.enum(['1year', '3years', '5years', 'indefinite']),
});

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  personalInfo: z.object({
    fullName: z.string().min(1),
    dateOfBirth: z.string().datetime(),
    address: z.string().min(1),
    phone: z.string().min(10),
    email: z.string().email(),
    emergencyContact: ContactSchema,
    preferredLanguage: z.string(),
    gender: z.string(),
    maritalStatus: z.string(),
  }),
  children: z.array(ChildSchema),
  healthcareProvider: HealthcareProviderSchema,
  insurance: InsuranceSchema,
  pharmacy: PharmacySchema,
  privacySettings: PrivacySettingsSchema,
});

export type Contact = z.infer<typeof ContactSchema>;
export type Child = z.infer<typeof ChildSchema>;
export type HealthcareProvider = z.infer<typeof HealthcareProviderSchema>;
export type Insurance = z.infer<typeof InsuranceSchema>;
export type Pharmacy = z.infer<typeof PharmacySchema>;
export type PrivacySettings = z.infer<typeof PrivacySettingsSchema>;
export type Profile = z.infer<typeof ProfileSchema>;