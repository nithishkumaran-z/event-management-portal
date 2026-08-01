/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Calendar, PlusCircle } from 'lucide-react';
import { Event, User } from '../types';
import { EventCard } from '../components/EventCard';

interface EventListProps {
  events: Event[];
  currentUser: User | null;
  onSelectEvent: (event: Event) => void;
  onRegisterClick: (event: Event) => void;
  userRegistrations: number[];
  onNavigate: (path: string) => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  currentUser,
  onSelectEvent,
  onRegisterClick,
  userRegistrations,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [organizer, setOrganizer] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'popularity'>('date-asc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = useMemo(() => {
    const cats = new Set(events.map((e) => e.category));
    return ['ALL', ...Array.from(cats)];
  }, [events]);

  const organizers = useMemo(() => {
    const orgs = new Set(events.map((e) => e.organizer));
    return ['ALL', ...Array.from(orgs)];
  }, [events]);

  const filteredAndSortedEvents = useMemo(() => {
    let result = events.filter((e) => {
      const matchSearch =
        e.eventName.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'ALL' || e.category === category;
      const matchOrg = organizer === 'ALL' || e.organizer === organizer;
      return matchSearch && matchCat && matchOrg && e.published;
    });

    result.sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      }
      if (sortBy === 'date-desc') {
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      }
      if (sortBy === 'price-asc') {
        return a.ticketPrice - b.ticketPrice;
      }
      if (sortBy === 'price-desc') {
        return b.ticketPrice - a.ticketPrice;
      }
      if (sortBy === 'popularity') {
        return (b.registeredCount || 0) - (a.registeredCount || 0);
      }
      return 0;
    });

    return result;
  }, [events, search, category, organizer, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedEvents.length / itemsPerPage));
  const paginatedEvents = filteredAndSortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Events Registry & Search</h1>
          <p className="text-slate-400 text-sm mt-1">
            Browse all conferences, workshops, and tech summits • Filter by category, organizer, or price
          </p>
        </div>

        {currentUser?.role === 'ROLE_ADMIN' && (
          <button
            onClick={() => onNavigate('/admin/events/new')}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-blue-900/20 flex items-center gap-2 text-sm self-start sm:self-auto transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Event</span>
          </button>
        )}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/60 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, description, or venue..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Organizer Filter */}
          <div>
            <select
              value={organizer}
              onChange={(e) => {
                setOrganizer(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {organizers.map((o) => (
                <option key={o} value={o}>
                  {o === 'ALL' ? 'All Organizers' : o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort row & Total counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-700/50 text-xs text-slate-400">
          <div>
            Showing <span className="font-semibold text-white">{filteredAndSortedEvents.length}</span> published events
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="date-asc">Date: Upcoming First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="popularity">Popularity (Most Registrations)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {paginatedEvents.length === 0 ? (
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/60 p-12 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Matching Events</h3>
          <p className="text-sm text-slate-400">
            We couldn't find any events that match your current filter criteria.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('ALL');
              setOrganizer('ALL');
            }}
            className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              onSelectEvent={onSelectEvent}
              onRegisterClick={onRegisterClick}
              isRegistered={userRegistrations.includes(ev.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-[#1e293b] px-6 py-4 rounded-2xl border border-slate-700/60">
          <div className="text-xs text-slate-400">
            Page <span className="font-semibold text-white">{currentPage}</span> of{' '}
            <span className="font-semibold text-white">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === p
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
