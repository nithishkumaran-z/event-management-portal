/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { QrTicketModal } from './components/QrTicketModal';

import { Home } from './pages/Home';
import { EventList } from './pages/EventList';
import { EventDetails } from './pages/EventDetails';
import { MyRegistrations } from './pages/MyRegistrations';
import { AdminDashboard } from './pages/AdminDashboard';
import { AddEditEvent } from './pages/AddEditEvent';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

import { 
  Event, 
  User, 
  Registration, 
  ToastMessage, 
  AdminStats, 
  CategoryDistribution, 
  RegistrationTrend 
} from './types';
import { apiService } from './services/apiService';

export default function App() {
  // --- STATE MANAGERS ---
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  // Modals & UI feedback
  const [activeQrModalReg, setActiveQrModalReg] = useState<Registration | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // --- INITIALIZATION ---
  useEffect(() => {
    // Initialize mock database tables
    apiService.initializeDemoData();

    // Load state
    const allUsers = apiService.getAllUsers();
    setUsers(allUsers);

    const loggedIn = apiService.getCurrentUser();
    setCurrentUser(loggedIn);

    const loadedEvents = apiService.getAllEvents();
    setEvents(loadedEvents);

    const loadedRegs = apiService.getAllRegistrations();
    setRegistrations(loadedRegs);
  }, []);

  // --- TOAST NOTIFICATIONS ---
  const addToast = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    // Auto dismiss after 4s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- NAVIGATION CONTROLLER ---
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- USER ACCOUNT / AUTH LOGIC ---
  const handleSwitchUser = (userId: number) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      apiService.setCurrentUser(found);
      addToast(
        'Demo User Switched',
        `Switched to ${found.fullName} (${found.role === 'ROLE_ADMIN' ? 'SUPER_ADMIN' : 'PARTICIPANT'})`,
        'info'
      );
    }
  };

  const handleLogin = (email: string, pass: string): boolean => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (found) {
      setCurrentUser(found);
      apiService.setCurrentUser(found);
      addToast(
        'JWT Authentication Success',
        `Welcome back, ${found.fullName}! Bearer token initialized.`,
        'success'
      );
      return true;
    }
    return false;
  };

  const handleRegisterUser = (newUserData: Omit<User, 'id' | 'createdAt'>) => {
    const created = apiService.createUser(newUserData);
    setUsers(apiService.getAllUsers());
    setCurrentUser(created);
    apiService.setCurrentUser(created);
    addToast(
      'Account Created',
      `Welcome to Event.Pro, ${created.fullName}!`,
      'success'
    );
  };

  const handleUpdateProfile = (updatedUser: User) => {
    const saved = apiService.updateUser(updatedUser);
    setUsers(apiService.getAllUsers());
    setCurrentUser(saved);
    apiService.setCurrentUser(saved);
    addToast(
      'Profile Updated',
      'Your organization credentials and profile details were updated.',
      'success'
    );
  };

  // --- EVENT MANAGEMENT ACTIONS ---
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    handleNavigate('/events/details');
  };

  const handleRegisterForEvent = (
    event: Event,
    ticketType: 'STANDARD' | 'VIP_PASS' | 'SPEAKER_PASS' = 'STANDARD'
  ) => {
    if (!currentUser) {
      addToast('Authentication Required', 'Please log in to register for events.', 'error');
      handleNavigate('/login');
      return;
    }

    try {
      const newReg = apiService.createRegistration(event.id, currentUser.id, ticketType);
      // Reload events & regs
      setEvents(apiService.getAllEvents());
      setRegistrations(apiService.getAllRegistrations());

      addToast(
        'Registration Confirmed!',
        `Pass #${newReg.registrationCode} created. QR check-in token generated.`,
        'success'
      );
      setActiveQrModalReg(newReg);
    } catch (e: any) {
      addToast('Registration Failed', e.message || 'Unable to register', 'error');
    }
  };

  const handleCancelRegistration = (regId: number) => {
    apiService.cancelRegistration(regId);
    setEvents(apiService.getAllEvents());
    setRegistrations(apiService.getAllRegistrations());
    addToast('Registration Cancelled', 'Your ticket has been cancelled.', 'info');
  };

  const handleSaveEvent = (
    eventData: Omit<Event, 'id' | 'createdAt' | 'registeredCount'>,
    id?: number
  ) => {
    if (id) {
      apiService.updateEvent({
        ...eventData,
        id,
        createdAt: new Date().toISOString().split('T')[0],
        registeredCount: eventToEdit?.registeredCount || 0,
      });
      addToast('Event Updated', `Successfully modified "${eventData.eventName}".`, 'success');
    } else {
      apiService.createEvent(eventData);
      addToast('Event Created', `New event "${eventData.eventName}" published.`, 'success');
    }
    setEvents(apiService.getAllEvents());
    setEventToEdit(null);
    handleNavigate('/admin');
  };

  const handleDeleteEvent = (event: Event) => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete event #${event.id}: "${event.eventName}"?`
      )
    ) {
      apiService.deleteEvent(event.id);
      setEvents(apiService.getAllEvents());
      setRegistrations(apiService.getAllRegistrations());
      addToast('Event Deleted', 'The event and its associated registrations were removed.', 'info');
    }
  };

  // --- DERIVED METRICS FOR ADMIN STATS ---
  const adminStats: AdminStats = useMemo(() => {
    const totalUsers = users.length;
    const totalEvents = events.length;
    const upcomingEvents = events.filter(
      (e) => new Date(e.eventDate).getTime() >= new Date().getTime()
    ).length;

    const totalRegistrations = registrations.length;
    const revenueGenerated = registrations.reduce((acc, reg) => {
      const ev = events.find((e) => e.id === reg.eventId);
      return acc + (ev?.ticketPrice || 0);
    }, 0);

    const confirmedCount = registrations.filter(
      (r) => r.status === 'CONFIRMED' || r.status === 'ATTENDED'
    ).length;
    const checkInRate =
      totalRegistrations > 0
        ? Math.round((confirmedCount / totalRegistrations) * 100)
        : 92;

    return {
      totalUsers,
      totalEvents,
      totalRegistrations,
      revenueGenerated: Math.max(revenueGenerated, 128450), // Show substantial enterprise revenue if initial demo
      upcomingEvents,
      checkInRate,
    };
  }, [users, events, registrations]);

  const categoryDistributions: CategoryDistribution[] = useMemo(() => {
    const map: Record<string, number> = {};
    events.forEach((ev) => {
      map[ev.category] = (map[ev.category] || 0) + 1;
    });

    const colors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];
    return Object.entries(map).map(([cat, count], idx) => ({
      category: cat,
      count,
      color: colors[idx % colors.length],
    }));
  }, [events]);

  const registrationTrends: RegistrationTrend[] = useMemo(() => {
    return [
      { time: '08:00', registrations: 14 },
      { time: '10:00', registrations: 28 },
      { time: '12:00', registrations: 45 },
      { time: '14:00', registrations: 62 },
      { time: '16:00', registrations: 89 },
      { time: '18:00', registrations: 110 },
      { time: '20:00', registrations: registrations.length + 95 },
    ];
  }, [registrations]);

  const currentUserRegistrations = useMemo(() => {
    if (!currentUser) return [];
    return registrations.filter((r) => r.userId === currentUser.id);
  }, [registrations, currentUser]);

  const userRegisteredEventIds = useMemo(() => {
    return currentUserRegistrations.map((r) => r.eventId);
  }, [currentUserRegistrations]);

  // --- ROUTE SWITCHER ---
  const renderMainContent = () => {
    if (currentPath === '/') {
      return (
        <Home
          events={events}
          stats={adminStats}
          currentUser={currentUser}
          onSelectEvent={handleSelectEvent}
          onRegisterClick={(ev) => handleRegisterForEvent(ev, 'STANDARD')}
          onNavigate={handleNavigate}
          userRegistrations={userRegisteredEventIds}
        />
      );
    }

    if (currentPath === '/events') {
      return (
        <EventList
          events={events}
          currentUser={currentUser}
          onSelectEvent={handleSelectEvent}
          onRegisterClick={(ev) => handleRegisterForEvent(ev, 'STANDARD')}
          userRegistrations={userRegisteredEventIds}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/events/details' && selectedEvent) {
      const userReg = currentUserRegistrations.find(
        (r) => r.eventId === selectedEvent.id
      );
      return (
        <EventDetails
          event={selectedEvent}
          currentUser={currentUser}
          onBack={() => handleNavigate('/events')}
          onRegister={handleRegisterForEvent}
          userRegistration={userReg}
          onViewTicket={(reg) => setActiveQrModalReg(reg)}
        />
      );
    }

    if (currentPath === '/registrations') {
      return (
        <MyRegistrations
          registrations={currentUserRegistrations}
          currentUser={currentUser}
          onViewTicket={(reg) => setActiveQrModalReg(reg)}
          onCancelRegistration={handleCancelRegistration}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/admin') {
      return (
        <AdminDashboard
          stats={adminStats}
          events={events}
          registrations={registrations}
          categoryDistributions={categoryDistributions}
          registrationTrends={registrationTrends}
          onNavigate={handleNavigate}
          onEditEvent={(ev) => {
            setEventToEdit(ev);
            handleNavigate('/admin/events/edit');
          }}
          onDeleteEvent={handleDeleteEvent}
        />
      );
    }

    if (
      currentPath === '/admin/events/new' ||
      currentPath === '/admin/events/edit'
    ) {
      return (
        <AddEditEvent
          eventToEdit={currentPath === '/admin/events/edit' ? eventToEdit : null}
          onSave={handleSaveEvent}
          onCancel={() => {
            setEventToEdit(null);
            handleNavigate('/admin');
          }}
        />
      );
    }

    if (currentPath === '/profile') {
      return (
        <Profile
          currentUser={currentUser}
          onUpdateProfile={handleUpdateProfile}
        />
      );
    }

    if (currentPath === '/login') {
      return (
        <Login
          onLogin={handleLogin}
          onNavigate={handleNavigate}
          demoUsers={users}
          onSwitchUser={handleSwitchUser}
        />
      );
    }

    if (currentPath === '/register') {
      return (
        <Register
          onRegister={handleRegisterUser}
          onNavigate={handleNavigate}
        />
      );
    }

    return <NotFound onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-200">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* QR Ticket Verification Modal */}
      <QrTicketModal
        registration={activeQrModalReg}
        onClose={() => setActiveQrModalReg(null)}
      />

      {/* Top Header Navbar */}
      <Navbar
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onSearchSubmit={(q) => {
          handleNavigate('/events');
        }}
        onSwitchUser={handleSwitchUser}
        users={users}
      />

      {/* Main Body Layout with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 gap-8">
        <Sidebar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          registrationCount={currentUserRegistrations.length}
        />

        <main className="flex-1 min-w-0">{renderMainContent()}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

