/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Event, Registration, AdminStats, CategoryDistribution, RegistrationTrend } from '../types';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

const INITIAL_USERS: User[] = [
  {
    id: 1,
    fullName: 'Alex Mercer (Admin)',
    email: 'admin@eventportal.com',
    role: 'ROLE_ADMIN',
    organization: 'Global Tech Events Inc.',
    bio: 'Senior Tech Event Director & System Administrator. Java 21 & Spring Boot Architect.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phoneNumber: '+1-555-0101',
    createdAt: '2026-01-15'
  },
  {
    id: 2,
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    role: 'ROLE_USER',
    organization: 'CloudScale Technologies',
    bio: 'Full-Stack Developer & AI Enthusiast. Regular speaker at cloud technology meetups.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phoneNumber: '+1-555-0102',
    createdAt: '2026-02-10'
  },
  {
    id: 3,
    fullName: 'David Chen',
    email: 'david.chen@enterprise.org',
    role: 'ROLE_USER',
    organization: 'Enterprise DevOps Forum',
    bio: 'Cloud Native Architect & Kubernetes Maintainer.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phoneNumber: '+1-555-0103',
    createdAt: '2026-03-05'
  },
  {
    id: 4,
    fullName: 'Emily Watson',
    email: 'emily.w@designstudio.io',
    role: 'ROLE_USER',
    organization: 'UX Leadership Alliance',
    bio: 'Lead Product Designer passionate about accessible interfaces and typography.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    phoneNumber: '+1-555-0104',
    createdAt: '2026-04-18'
  }
];

const INITIAL_EVENTS: Event[] = [
  {
    id: 101,
    eventName: 'Global Java 21 & Spring Boot 3 Summit 2026',
    description: 'An intensive two-day conference covering virtual threads, Spring Boot 3 enterprise architecture, Hibernate optimizations, and cloud-native Kubernetes deployments. Join leading Java architects and engineers.',
    category: 'Technology',
    eventDate: '2026-10-15',
    eventTime: '09:00',
    venue: 'San Francisco Convention Center, CA & Online',
    organizer: 'Spring Cloud Consortium',
    maxParticipants: 500,
    registeredCount: 425,
    registrationDeadline: '2026-10-10T23:59',
    eventImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    ticketPrice: 149.00,
    published: true,
    createdBy: 1,
    createdAt: '2026-07-01'
  },
  {
    id: 102,
    eventName: 'Next-Gen AI & Large Language Models Expo',
    description: 'Explore hands-on workshops with Gemini API, multi-agent frameworks, RAG architectures, and ethical AI governance for enterprise engineering teams. Free admission for early registrants.',
    category: 'Artificial Intelligence',
    eventDate: '2026-11-05',
    eventTime: '10:00',
    venue: 'Silicon Valley Innovation Hub, San Jose, CA',
    organizer: 'DeepMind & Google Cloud Builders',
    maxParticipants: 350,
    registeredCount: 310,
    registrationDeadline: '2026-11-01T18:00',
    eventImageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    ticketPrice: 0.00,
    published: true,
    createdBy: 1,
    createdAt: '2026-07-05'
  },
  {
    id: 103,
    eventName: 'Enterprise Cloud Security & Zero Trust Bootcamp',
    description: 'Master modern JWT security, OAuth2, OpenID Connect, API gateway security, and automated vulnerability scanning in hybrid cloud infrastructures. Hands-on labs included.',
    category: 'Cybersecurity',
    eventDate: '2026-09-20',
    eventTime: '13:30',
    venue: 'Austin Marriott Downtown, Austin, TX',
    organizer: 'InfoSec Alliance USA',
    maxParticipants: 200,
    registeredCount: 195,
    registrationDeadline: '2026-09-18T12:00',
    eventImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    ticketPrice: 99.00,
    published: true,
    createdBy: 1,
    createdAt: '2026-06-15'
  },
  {
    id: 104,
    eventName: 'Design Systems & UI/UX Leaders Connect',
    description: 'Learn scalable token systems, accessible React components, Figma to React pipelines, and micro-interaction animation patterns with top product designers.',
    category: 'Design & UX',
    eventDate: '2026-12-02',
    eventTime: '11:00',
    venue: 'Metropolitan Arts Center, New York, NY',
    organizer: 'UX Masters Network',
    maxParticipants: 180,
    registeredCount: 78,
    registrationDeadline: '2026-11-28T20:00',
    eventImageUrl: 'https://images.unsplash.com/photo-1558403194-611308249627?w=800',
    ticketPrice: 49.00,
    published: true,
    createdBy: 1,
    createdAt: '2026-07-10'
  },
  {
    id: 105,
    eventName: 'Fintech Blockchain & Decentralized Finance Forum',
    description: 'In-depth panel discussions on high-throughput ledger systems, smart contract auditing, and institutional DeFi compliance.',
    category: 'Finance & FinTech',
    eventDate: '2026-10-28',
    eventTime: '14:00',
    venue: 'Chicago Board of Trade Building, IL',
    organizer: 'FinTech Future Corp',
    maxParticipants: 120,
    registeredCount: 120,
    registrationDeadline: '2026-10-25T17:00',
    eventImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    ticketPrice: 199.00,
    published: true,
    createdBy: 1,
    createdAt: '2026-07-12'
  },
  {
    id: 106,
    eventName: 'Cloud Native Microservices with Kubernetes',
    description: 'Advanced service mesh architectures, Istio traffic shaping, gRPC performance benchmarks, and GitOps continuous deployment.',
    category: 'Technology',
    eventDate: '2026-11-18',
    eventTime: '09:30',
    venue: 'Seattle Cloud Center, WA',
    organizer: 'CloudScale Technologies',
    maxParticipants: 250,
    registeredCount: 140,
    registrationDeadline: '2026-11-15T18:00',
    eventImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    ticketPrice: 129.00,
    published: true,
    createdBy: 1,
    createdAt: '2026-07-20'
  }
];

const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 1001,
    registrationCode: 'REG-2026-JV101-SJ',
    userId: 2,
    userEmail: 'sarah.j@gmail.com',
    userFullName: 'Sarah Jenkins',
    eventId: 101,
    eventName: 'Global Java 21 & Spring Boot 3 Summit 2026',
    eventDate: '2026-10-15',
    eventTime: '09:00',
    venue: 'San Francisco Convention Center, CA & Online',
    status: 'CONFIRMED',
    qrCodeToken: 'QR-TOKEN-JV101-SARAH-991',
    ticketType: 'VIP_PASS',
    registrationDate: '2026-08-01 10:15'
  },
  {
    id: 1002,
    registrationCode: 'REG-2026-AI102-SJ',
    userId: 2,
    userEmail: 'sarah.j@gmail.com',
    userFullName: 'Sarah Jenkins',
    eventId: 102,
    eventName: 'Next-Gen AI & Large Language Models Expo',
    eventDate: '2026-11-05',
    eventTime: '10:00',
    venue: 'Silicon Valley Innovation Hub, San Jose, CA',
    status: 'CONFIRMED',
    qrCodeToken: 'QR-TOKEN-AI102-SARAH-442',
    ticketType: 'STANDARD',
    registrationDate: '2026-08-01 11:20'
  },
  {
    id: 1003,
    registrationCode: 'REG-2026-JV101-DC',
    userId: 3,
    userEmail: 'david.chen@enterprise.org',
    userFullName: 'David Chen',
    eventId: 101,
    eventName: 'Global Java 21 & Spring Boot 3 Summit 2026',
    eventDate: '2026-10-15',
    eventTime: '09:00',
    venue: 'San Francisco Convention Center, CA & Online',
    status: 'CONFIRMED',
    qrCodeToken: 'QR-TOKEN-JV101-DAVID-778',
    ticketType: 'STANDARD',
    registrationDate: '2026-08-01 12:05'
  },
  {
    id: 1004,
    registrationCode: 'REG-2026-SEC103-EW',
    userId: 4,
    userEmail: 'emily.w@designstudio.io',
    userFullName: 'Emily Watson',
    eventId: 103,
    eventName: 'Enterprise Cloud Security & Zero Trust Bootcamp',
    eventDate: '2026-09-20',
    eventTime: '13:30',
    venue: 'Austin Marriott Downtown, Austin, TX',
    status: 'CONFIRMED',
    qrCodeToken: 'QR-TOKEN-SEC103-EMILY-331',
    ticketType: 'STANDARD',
    registrationDate: '2026-08-01 14:30'
  }
];

class ApiService {
  private getStorage<T>(key: string, initial: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch (e) {
      return initial;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  initializeDemoData(): void {
    this.getStorage('ep_users', INITIAL_USERS);
    this.getStorage('ep_events', INITIAL_EVENTS);
    this.getStorage('ep_registrations', INITIAL_REGISTRATIONS);
  }

  getAllUsers(): User[] {
    return this.getUsers();
  }

  getAllEvents(): Event[] {
    return this.getEvents();
  }

  getAllRegistrations(): Registration[] {
    return this.getRegistrations();
  }

  createUser(newUserData: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...newUserData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    this.setStorage('ep_users', users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  updateUser(updatedUser: User): User {
    return this.updateProfile(updatedUser);
  }

  // --- Users & Auth ---
  getUsers(): User[] {
    return this.getStorage<User[]>('ep_users', INITIAL_USERS);
  }

  getCurrentUser(): User {
    const user = this.getStorage<User | null>('ep_current_user', null);
    if (!user) {
      const defaultUser = INITIAL_USERS[0]; // Admin by default
      this.setStorage('ep_current_user', defaultUser);
      return defaultUser;
    }
    return user;
  }

  setCurrentUser(user: User): void {
    this.setStorage('ep_current_user', user);
  }

  login(email: string): { user: User; token: string } | null {
    const users = this.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      this.setCurrentUser(found);
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiInICsgZm91bmQuZW1haWwgKyAnIiwicm9sZSI6IicgKyBmb3VuZC5yb2xlICsgJyJ9.EP_TOKEN_' + Date.now();
      localStorage.setItem('ep_jwt_token', token);
      return { user: found, token };
    }
    return null;
  }

  registerUser(fullName: string, email: string, organization: string, role: 'ROLE_ADMIN' | 'ROLE_USER' = 'ROLE_USER'): User {
    const users = this.getUsers();
    const newUser: User = {
      id: Date.now(),
      fullName,
      email,
      role,
      organization: organization || 'Independent',
      bio: 'New portal member',
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + (users.length * 100)}?w=150`,
      phoneNumber: '+1-555-0199',
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    this.setStorage('ep_users', users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  updateProfile(updatedUser: User): User {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.setStorage('ep_users', users);
      this.setCurrentUser(updatedUser);
    }
    return updatedUser;
  }

  // --- Events ---
  getEvents(): Event[] {
    return this.getStorage<Event[]>('ep_events', INITIAL_EVENTS);
  }

  getEventById(id: number): Event | undefined {
    return this.getEvents().find(e => e.id === id);
  }

  createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'registeredCount'>): Event {
    const events = this.getEvents();
    const newEvent: Event = {
      ...eventData,
      id: Date.now(),
      registeredCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    events.unshift(newEvent);
    this.setStorage('ep_events', events);
    return newEvent;
  }

  updateEvent(idOrEvent: number | Partial<Event>, eventData?: Partial<Event>): Event | null {
    const id = typeof idOrEvent === 'number' ? idOrEvent : idOrEvent.id;
    const dataToUpdate = typeof idOrEvent === 'number' ? (eventData || {}) : idOrEvent;
    if (id === undefined) return null;
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...dataToUpdate };
      this.setStorage('ep_events', events);
      return events[index];
    }
    return null;
  }

  deleteEvent(id: number): boolean {
    const events = this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    if (filtered.length !== events.length) {
      this.setStorage('ep_events', filtered);
      return true;
    }
    return false;
  }

  // --- Registrations ---
  getRegistrations(): Registration[] {
    return this.getStorage<Registration[]>('ep_registrations', INITIAL_REGISTRATIONS);
  }

  getUserRegistrations(userId: number): Registration[] {
    return this.getRegistrations().filter(r => r.userId === userId);
  }

  getEventRegistrations(eventId: number): Registration[] {
    return this.getRegistrations().filter(r => r.eventId === eventId);
  }

  registerForEvent(user: User, event: Event, ticketType: 'STANDARD' | 'VIP_PASS' | 'SPEAKER_PASS' = 'STANDARD'): Registration {
    const registrations = this.getRegistrations();
    const newReg: Registration = {
      id: Date.now(),
      registrationCode: `REG-2026-${event.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      userId: user.id,
      userEmail: user.email,
      userFullName: user.fullName as string,
      eventId: event.id,
      eventName: event.eventName,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      venue: event.venue,
      status: 'CONFIRMED',
      qrCodeToken: `QR-TOKEN-EV${event.id}-USR${user.id}-${Date.now().toString().slice(-6)}`,
      ticketType,
      registrationDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    registrations.unshift(newReg);
    this.setStorage('ep_registrations', registrations);

    // Update event registered count
    const events = this.getEvents();
    const eventIdx = events.findIndex(e => e.id === event.id);
    if (eventIdx !== -1) {
      events[eventIdx].registeredCount = (events[eventIdx].registeredCount || 0) + 1;
      this.setStorage('ep_events', events);
    }

    return newReg;
  }

  createRegistration(eventId: number, userId: number, ticketType: 'STANDARD' | 'VIP_PASS' | 'SPEAKER_PASS' = 'STANDARD'): Registration {
    const user = this.getUsers().find(u => u.id === userId) || this.getCurrentUser();
    const event = this.getEventById(eventId);
    if (!event) {
      throw new Error('Event not found.');
    }
    return this.registerForEvent(user, event, ticketType);
  }

  cancelRegistration(regId: number): boolean {
    const registrations = this.getRegistrations();
    const index = registrations.findIndex(r => r.id === regId);
    if (index !== -1) {
      const eventId = registrations[index].eventId;
      registrations[index].status = 'CANCELLED';
      this.setStorage('ep_registrations', registrations);

      // Decrement count
      const events = this.getEvents();
      const eventIdx = events.findIndex(e => e.id === eventId);
      if (eventIdx !== -1 && events[eventIdx].registeredCount > 0) {
        events[eventIdx].registeredCount -= 1;
        this.setStorage('ep_events', events);
      }
      return true;
    }
    return false;
  }

  // --- Admin Stats ---
  getAdminStats(): AdminStats {
    const users = this.getUsers();
    const events = this.getEvents();
    const registrations = this.getRegistrations();

    const confirmedRegs = registrations.filter(r => r.status === 'CONFIRMED' || r.status === 'ATTENDED');
    const revenue = confirmedRegs.reduce((acc, reg) => {
      const event = events.find(e => e.id === reg.eventId);
      return acc + (event ? event.ticketPrice : 0);
    }, 0);

    return {
      totalUsers: users.length + 12838, // Realistic seed total matching theme stats
      totalEvents: events.length,
      upcomingEvents: events.filter(e => new Date(e.eventDate) >= new Date()).length,
      registeredParticipants: confirmedRegs.length + 1268,
      revenueGenerated: revenue + 84200,
      checkInRate: 94.2
    };
  }

  getCategoryDistributions(): CategoryDistribution[] {
    const events = this.getEvents();
    const map: Record<string, number> = {};
    events.forEach(e => {
      map[e.category] = (map[e.category] || 0) + 1;
    });

    const colors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];
    return Object.entries(map).map(([category, count], idx) => ({
      category,
      count,
      color: colors[idx % colors.length]
    }));
  }

  getRegistrationTrends(): RegistrationTrend[] {
    return [
      { time: '08:00', registrations: 45 },
      { time: '10:00', registrations: 82 },
      { time: '12:00', registrations: 128 },
      { time: '14:00', registrations: 95 },
      { time: '16:00', registrations: 164 },
      { time: '18:00', registrations: 142 },
      { time: '20:00', registrations: 110 }
    ];
  }

  // --- Exports ---
  exportRegistrationsToExcel(registrations: Registration[], eventName: string = 'All_Events'): void {
    const data = registrations.map(reg => ({
      'Registration ID': reg.id,
      'Registration Code': reg.registrationCode,
      'Participant Name': reg.userFullName,
      'Participant Email': reg.userEmail,
      'Event Name': reg.eventName,
      'Event Date': reg.eventDate,
      'Ticket Type': reg.ticketType,
      'Status': reg.status,
      'Registration Time': reg.registrationDate
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
    XLSX.writeFile(workbook, `Participants_${eventName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  downloadPdfTicket(registration: Registration): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [180, 95]
    });

    // Dark elegant background
    doc.setFillColor(15, 23, 42); // #0f172a
    doc.rect(0, 0, 180, 95, 'F');

    // Accent header bar
    doc.setFillColor(37, 99, 235); // #2563EB
    doc.rect(0, 0, 180, 14, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('EVENT.PRO — OFFICIAL EVENT ADMISSION TICKET', 10, 9);

    // Event title
    doc.setFontSize(14);
    doc.text(registration.eventName, 10, 26);

    // Details column 1
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('PARTICIPANT NAME', 10, 38);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text(registration.userFullName, 10, 44);

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('TICKET TYPE & STATUS', 10, 56);
    doc.setTextColor(16, 185, 129); // emerald-500
    doc.setFontSize(11);
    doc.text(`${registration.ticketType} (${registration.status})`, 10, 62);

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('VENUE', 10, 74);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(registration.venue, 10, 80);

    // Details column 2
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('DATE & TIME', 100, 38);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text(`${registration.eventDate} at ${registration.eventTime}`, 100, 44);

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('REGISTRATION CODE', 100, 56);
    doc.setTextColor(59, 130, 246);
    doc.setFontSize(11);
    doc.text(registration.registrationCode, 100, 62);

    // QR Token display
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`QR Token: ${registration.qrCodeToken}`, 10, 90);

    doc.save(`Ticket_${registration.registrationCode}.pdf`);
  }
}

export const apiService = new ApiService();
