/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, MapPin, Users, Tag, Clock, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onSelectEvent: (event: Event) => void;
  onRegisterClick?: (event: Event) => void;
  isAdmin?: boolean;
  onEditClick?: (event: Event) => void;
  onDeleteClick?: (event: Event) => void;
  isRegistered?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  onRegisterClick,
  isAdmin = false,
  onEditClick,
  onDeleteClick,
  isRegistered = false,
}) => {
  const percentFilled = Math.min(
    100,
    Math.round(((event.registeredCount || 0) / event.maxParticipants) * 100)
  );

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Technology':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Artificial Intelligence':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Cybersecurity':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'Design & UX':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Finance & FinTech':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const isFull = (event.registeredCount || 0) >= event.maxParticipants;

  return (
    <div className="bg-[#1e293b] rounded-2xl border border-slate-700/60 shadow-lg hover:border-slate-600 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Event Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-800">
        <img
          src={event.eventImageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
          alt={event.eventName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/30 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>
        </div>

        {/* Ticket Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-[#0f172a]/90 text-white font-mono text-xs font-bold rounded-full border border-slate-700 shadow">
            {event.ticketPrice === 0 ? 'FREE PASS' : `$${event.ticketPrice.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{event.eventDate} • {event.eventTime}</span>
          </div>

          <h3
            onClick={() => onSelectEvent(event)}
            className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {event.eventName}
          </h3>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-700/60">
          {/* Venue & Organizer */}
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 truncate">
              <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">Org: {event.organizer}</span>
            </div>
          </div>

          {/* Capacity Bar */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Capacity
              </span>
              <span className={percentFilled >= 90 ? 'text-amber-400 font-mono' : 'text-slate-300 font-mono'}>
                {event.registeredCount || 0} / {event.maxParticipants} ({percentFilled}%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentFilled >= 100
                    ? 'bg-red-500'
                    : percentFilled >= 80
                    ? 'bg-amber-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${percentFilled}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onSelectEvent(event)}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isAdmin ? (
              <>
                <button
                  onClick={() => onEditClick && onEditClick(event)}
                  title="Edit Event"
                  className="px-3 py-2 bg-slate-800 hover:bg-blue-600/20 text-blue-400 rounded-xl border border-slate-700 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteClick && onDeleteClick(event)}
                  title="Delete Event"
                  className="px-3 py-2 bg-slate-800 hover:bg-red-600/20 text-red-400 rounded-xl border border-slate-700 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            ) : isRegistered ? (
              <div className="flex-1 px-4 py-2 bg-emerald-500/15 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/30 text-center">
                Registered
              </div>
            ) : (
              <button
                onClick={() => onRegisterClick && onRegisterClick(event)}
                disabled={isFull}
                className={`flex-1 px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-md ${
                  isFull
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20'
                }`}
              >
                {isFull ? 'Full' : 'Register Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
