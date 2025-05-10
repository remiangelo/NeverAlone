// User-related types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  createdAt: any; // Firestore timestamp
  journalEntries: JournalEntry[];
  cleanDate: string | null; // ISO date string
  preferences: UserPreferences;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
}

// Meeting-related types
export interface Meeting {
  id: string;
  name: string;
  type: 'NA' | 'AA';
  format: 'in-person' | 'online' | 'hybrid';
  day: Day;
  time: string; // 24-hour format, e.g., "19:30"
  duration: number; // in minutes
  address?: Address;
  virtualLink?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  tags: string[];
}

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Journal-related types
export interface JournalEntry {
  id: string;
  date: string; // ISO date string
  title: string;
  content: string;
  mood: Mood;
  gratitude?: string[];
  tags?: string[];
  isPrivate: boolean;
}

export type Mood = 'great' | 'good' | 'okay' | 'bad' | 'terrible';

// Clean time-related types
export interface CleanTimeRecord {
  userId: string;
  cleanDate: string; // ISO date string
  milestones: Milestone[];
}

export interface Milestone {
  days: number;
  achieved: boolean;
  achievedDate?: string; // ISO date string
  name: string;
}

// Common types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
}