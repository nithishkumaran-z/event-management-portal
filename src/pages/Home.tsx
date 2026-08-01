/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Calendar, Users, Shield, ArrowRight, Sparkles, Server, CheckCircle2 } from 'lucide-react';
import { Event, User, AdminStats } from '../types';
import { EventCard } from '../components/EventCard';

interface HomeProps {
  events: Event[];
  stats: AdminStats;
  currentUser: User | null;
  onSelectEvent: (event: Event) => void;
  onRegisterClick: (event: Event) => void;
  onNavigate: (path: string) => void;
  userRegistrations: number[];
}

export const Home: React.FC<HomeProps> = ({
  events,
  stats,
  currentUser,
  onSelectEvent,
  onRegisterClick,
  onNavigate,
  userRegistrations,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'ALL',
    'Technology',
    'Artificial Intelligence',
    'Cybersecurity',
    'Design & UX',
    'Finance & FinTech',
  ];

  const filteredEvents = events.filter((e) => {
    const matchCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    const matchSearch =
      e.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch && e.published;
  });

  return (
    <div className="space-y-10">
      {/* Hero Banner matching Elegant Dark Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 via-[#1e293b] to-[#1e293b] border border-slate-700/80 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Java 21 • Spring Boot 3 • MySQL 8.0 • JWT Security</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Enterprise Event Management Portal <span className="text-blue-400 font-mono">v2.4</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
            A full-stack, responsive event platform with real-time registration check-ins, automated QR code verification, Excel participant export, and PDF ticket generation.
          </p>

          {/* Search bar inside Hero */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search summits, workshops, or organizers..."
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-inner"
              />
            </div>
            <button
              onClick={() => onNavigate('/events')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative Circle & Grid Overlay */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Stats Grid exactly matching Elegant Dark Theme layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/50 shadow-sm">
          <div className="text-slate-400 text-sm font-medium">Total Active Users</div>
          <div className="text-3xl font-bold mt-2 text-white font-mono">
            {stats.totalUsers.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-400">
            <span className="mr-1">↑ 12%</span> from last month
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/50 shadow-sm">
          <div className="text-slate-400 text-sm font-medium">Revenue Generated</div>
          <div className="text-3xl font-bold mt-2 text-white font-mono">
            ${stats.revenueGenerated.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-400">
            <span className="mr-1">↑ 8%</span> vs projections
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/50 shadow-sm">
          <div className="text-slate-400 text-sm font-medium">Upcoming Events</div>
          <div className="text-3xl font-bold mt-2 text-white font-mono">
            {stats.totalEvents}
          </div>
          <div className="mt-3 flex items-center text-xs text-blue-400">
            <span className="mr-1 font-mono">{stats.upcomingEvents}</span> starting this season
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/50 shadow-sm">
          <div className="text-slate-400 text-sm font-medium">Check-in Rate</div>
          <div className="text-3xl font-bold mt-2 text-white font-mono">
            {stats.checkInRate}%
          </div>
          <div className="mt-3 flex items-center text-xs text-slate-500">
            Avg. latency <span className="text-slate-300 ml-1 font-mono">142ms</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Featured Summits & Workshops</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Filter by conference category or browse our upcoming enterprise events
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'bg-[#1e293b] text-slate-400 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-12 text-center space-y-3">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="text-lg font-semibold text-white">No events found matching your filter</div>
            <p className="text-sm text-slate-400">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => (
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
      </div>
    </div>
  );
};
