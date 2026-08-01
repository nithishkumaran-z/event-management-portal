/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoleType = 'ROLE_ADMIN' | 'ROLE_USER';

export interface User {
  id: number;
  fullName: String;
  email: string;
  role: RoleType;
  organization: string;
  bio: string;
  avatarUrl: string;
  phoneNumber: string;
  createdAt: string;
}

export interface Event {
  id: number;
  eventName: string;
  description: string;
  category: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  organizer: string;
  maxParticipants: number;
  registeredCount: number;
  registrationDeadline: string;
  eventImageUrl: string;
  ticketPrice: number;
  published: boolean;
  createdBy: number;
  createdAt: string;
}

export interface Registration {
  id: number;
  registrationCode: string;
  userId: number;
  userEmail: string;
  userFullName: string;
  eventId: number;
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'WAITLISTED' | 'ATTENDED';
  qrCodeToken: string;
  ticketType: 'STANDARD' | 'VIP_PASS' | 'SPEAKER_PASS';
  registrationDate: string;
}

export interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  upcomingEvents: number;
  registeredParticipants: number;
  revenueGenerated: number;
  checkInRate: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  color: string;
}

export interface RegistrationTrend {
  time: string;
  registrations: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
