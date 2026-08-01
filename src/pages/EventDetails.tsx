/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  Clock, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle, 
  Mail, 
  QrCode, 
  DollarSign,
  Share2,
  Building2
} from 'lucide-react';
import { Event, User, Registration } from '../types';

interface EventDetailsProps {
  event: Event;
  currentUser: User | null;
  onBack: () => void;
  onRegister: (event: Event, ticketType: 'STANDARD' | 'VIP_PASS' | 'SPEAKER_PASS') => void;
  userRegistration?: Registration;
  onViewTicket?: (registration: Registration) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  currentUser,
  onBack,
  onRegister,
  userRegistration,
  onViewTicket,
}) => {
  const [selectedTicketType, setSelectedTicketType] = useState<'STANDARD' | 'VIP_PASS' | 'SPEAKER_PASS'>('STANDARD');
  const [emailSentNotice, setEmailSentNotice] = useState(false);

  const isFull = (event.registeredCount || 0) >= event.maxParticipants;
  const isRegistered = !!userRegistration;

  const handleRegisterClick = () => {
    onRegister(event, selectedTicketType);
    setEmailSentNotice(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-[#1e293b] rounded-3xl border border-slate-700/60 overflow-hidden shadow-2xl">
        <div className="relative h-80 w-full overflow-hidden bg-slate-800">
          <img
            src={event.eventImageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'}
            alt={event.eventName}
            className="w-full h-full object-cover opacity-85"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/50 to-transparent"></div>

          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg">
              {event.category}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-900/90 text-emerald-400 border border-slate-700">
              ID: #EV-{event.id}
            </span>
          </div>

          <div className="absolute top-6 right-6">
            <span className="px-4 py-2 rounded-full text-sm font-bold font-mono bg-[#0f172a]/90 text-white border border-slate-700 shadow-xl">
              {event.ticketPrice === 0 ? 'FREE EVENT' : `$${event.ticketPrice.toFixed(2)} USD`}
            </span>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-blue-300 font-mono mb-2 uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>Registration Deadline: {event.registrationDeadline.replace('T', ' ')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {event.eventName}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-sm uppercase font-bold text-slate-400 tracking-wider mb-2">
                About This Event
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Detailed specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700/60">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">DATE & TIME</div>
                  <div className="text-sm font-bold text-white mt-0.5">{event.eventDate}</div>
                  <div className="text-xs text-slate-400">Starts at {event.eventTime} UTC</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">VENUE / PLATFORM</div>
                  <div className="text-sm font-bold text-white mt-0.5">{event.venue}</div>
                  <div className="text-xs text-slate-400">In-person & Livestream access</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">ORGANIZED BY</div>
                  <div className="text-sm font-bold text-white mt-0.5">{event.organizer}</div>
                  <div className="text-xs text-slate-400">Verified Partner Organization</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">PARTICIPANT CAPACITY</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {event.registeredCount || 0} / {event.maxParticipants} Registered
                  </div>
                  <div className="text-xs text-slate-400">
                    {event.maxParticipants - (event.registeredCount || 0)} seats remaining
                  </div>
                </div>
              </div>
            </div>

            {/* Email Confirmation notice banner */}
            {emailSentNotice && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold">Confirmation Email Sent!</div>
                  <div>
                    A copy of your QR check-in token and invoice has been sent to{' '}
                    <span className="font-mono underline">{currentUser?.email}</span>.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Registration Panel */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/80 flex flex-col justify-between gap-6 h-fit">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Registration Portal</h3>
              <p className="text-xs text-slate-400 mb-4">
                Select your ticket tier to receive an instant QR code pass.
              </p>

              {/* Ticket Type Selector */}
              {!isRegistered && (
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Select Pass Type
                  </div>

                  <label
                    onClick={() => setSelectedTicketType('STANDARD')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedTicketType === 'STANDARD'
                        ? 'bg-blue-600/15 border-blue-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Standard Participant</div>
                      <div className="text-[11px] text-slate-400">Main keynote & workshop access</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400">INCLUDED</span>
                  </label>

                  <label
                    onClick={() => setSelectedTicketType('VIP_PASS')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedTicketType === 'VIP_PASS'
                        ? 'bg-blue-600/15 border-blue-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">VIP All-Access Pass</div>
                      <div className="text-[11px] text-slate-400">Priority seating & executive lounge</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">VIP TIER</span>
                  </label>
                </div>
              )}

              {/* Registration status or CTA */}
              {isRegistered ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-center space-y-2">
                    <CheckCircle className="w-8 h-8 mx-auto text-emerald-400" />
                    <div className="font-bold text-sm">You Are Registered!</div>
                    <div className="text-xs text-slate-300 font-mono">
                      Code: {userRegistration.registrationCode}
                    </div>
                  </div>

                  <button
                    onClick={() => onViewTicket && onViewTicket(userRegistration)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View Official QR Ticket</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRegisterClick}
                  disabled={isFull || !currentUser}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    isFull || !currentUser
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/30'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isFull
                      ? 'Registration Full'
                      : !currentUser
                      ? 'Login to Register'
                      : 'Confirm Registration'}
                  </span>
                </button>
              )}
            </div>

            {/* Secure check-in notice */}
            <div className="pt-4 border-t border-slate-700/80 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Protected by JWT Spring Security & automated QR token verification.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
