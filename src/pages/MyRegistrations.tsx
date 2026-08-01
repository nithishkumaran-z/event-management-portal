/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Ticket, QrCode, Download, Trash2, Calendar, MapPin, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Registration, User } from '../types';
import { apiService } from '../services/apiService';

interface MyRegistrationsProps {
  registrations: Registration[];
  currentUser: User | null;
  onViewTicket: (reg: Registration) => void;
  onCancelRegistration: (regId: number) => void;
  onNavigate: (path: string) => void;
}

export const MyRegistrations: React.FC<MyRegistrationsProps> = ({
  registrations,
  currentUser,
  onViewTicket,
  onCancelRegistration,
  onNavigate,
}) => {
  const activeRegistrations = registrations.filter((r) => r.status === 'CONFIRMED' || r.status === 'ATTENDED');
  const cancelledRegistrations = registrations.filter((r) => r.status === 'CANCELLED');

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Registered Events</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your conference tickets, download PDF admission passes, and access QR tokens
          </p>
        </div>

        <button
          onClick={() => onNavigate('/events')}
          className="bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
        >
          Browse More Events
        </button>
      </div>

      {/* Active Registrations List */}
      {activeRegistrations.length === 0 ? (
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/60 p-12 text-center space-y-4">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Active Event Tickets</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You haven't registered for any upcoming events yet. Explore our technology and AI summits to secure your pass.
          </p>
          <button
            onClick={() => onNavigate('/events')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-colors"
          >
            Explore Events Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeRegistrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-[#1e293b] rounded-2xl border border-slate-700/60 p-6 flex flex-col justify-between gap-5 shadow-lg hover:border-slate-600 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 uppercase">
                    {reg.ticketType}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {reg.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">{reg.eventName}</h3>

                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>
                      {reg.eventDate} at {reg.eventTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{reg.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                    <span>Token: {reg.qrCodeToken}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-700/60 flex items-center gap-2">
                <button
                  onClick={() => onViewTicket(reg)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Show QR Pass</span>
                </button>

                <button
                  onClick={() => apiService.downloadPdfTicket(reg)}
                  title="Download PDF Ticket"
                  className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to cancel your registration for ${reg.eventName}?`)) {
                      onCancelRegistration(reg.id);
                    }
                  }}
                  title="Cancel Registration"
                  className="px-3 py-2.5 bg-slate-800 hover:bg-red-600/20 text-red-400 rounded-xl border border-slate-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancelled history if any */}
      {cancelledRegistrations.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-700/60">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Cancelled / Past Registrations
          </h3>
          <div className="space-y-2">
            {cancelledRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs text-slate-400"
              >
                <div>
                  <div className="font-semibold text-slate-300">{reg.eventName}</div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Code: {reg.registrationCode} • {reg.eventDate}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 uppercase font-bold">
                  CANCELLED
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
