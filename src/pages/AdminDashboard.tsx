/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  PlusCircle, 
  Download, 
  Users, 
  DollarSign, 
  Calendar, 
  Activity, 
  TrendingUp, 
  CheckCircle, 
  Edit, 
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Event, User, Registration, AdminStats, CategoryDistribution, RegistrationTrend } from '../types';
import { apiService } from '../services/apiService';

interface AdminDashboardProps {
  stats: AdminStats;
  events: Event[];
  registrations: Registration[];
  categoryDistributions: CategoryDistribution[];
  registrationTrends: RegistrationTrend[];
  onNavigate: (path: string) => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  events,
  registrations,
  categoryDistributions,
  registrationTrends,
  onNavigate,
  onEditEvent,
  onDeleteEvent,
}) => {
  const handleExportExcel = () => {
    apiService.exportRegistrationsToExcel(registrations, 'All_Enterprise_Events');
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Action matching Elegant Dark theme HTML */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Portal Statistics</h1>
          <p className="text-slate-400 mt-1">
            System overview & telemetry for <span className="text-emerald-400 font-mono">v2.4.1-stable</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl text-slate-200 font-semibold border border-slate-700 text-xs flex items-center gap-2 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export All .XLSX</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/events/new')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all text-sm"
          >
            <span className="text-xl font-bold leading-none">+</span>
            <span>New Event Module</span>
          </button>
        </div>
      </div>

      {/* Stats Grid matching Elegant Dark Theme */}
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
            <span className="mr-1 font-mono">{stats.upcomingEvents}</span> starting within 48h
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

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Hourly Trends (Area Chart) */}
        <div className="lg:col-span-2 bg-[#1e293b] p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              Real-time Registration Check-in Volume
            </h3>
            <span className="text-xs text-slate-400 font-mono">UTC Timestamp</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrends}>
                <defs>
                  <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRegs)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution (Pie Chart) */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-base mb-2">Category Breakdown</h3>
            <p className="text-xs text-slate-400">Events catalog by topic domain</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributions}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  innerRadius={40}
                  paddingAngle={4}
                >
                  {categoryDistributions.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/60 text-[11px]">
            {categoryDistributions.map((item) => (
              <div key={item.category} className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-300 truncate">{item.category}</span>
                <span className="text-slate-500 font-mono ml-auto">({item.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables & Side Chart matching Elegant Dark HTML */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Column */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/30">
            <h3 className="font-bold text-lg text-white">Event Registry & Capacity Status</h3>
            <button
              onClick={() => onNavigate('/events')}
              className="text-blue-400 text-sm font-semibold hover:underline"
            >
              View All Events
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Event Name</th>
                  <th className="px-6 py-3">Organizer</th>
                  <th className="px-6 py-3">Capacity</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-sm">
                {events.slice(0, 6).map((ev) => {
                  const percent = Math.min(
                    100,
                    Math.round(((ev.registeredCount || 0) / ev.maxParticipants) * 100)
                  );
                  const isFull = percent >= 100;

                  return (
                    <tr key={ev.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{ev.eventName}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{ev.organizer}</td>
                      <td className="px-6 py-4">
                        <div className="w-28 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isFull ? 'bg-red-500' : percent >= 80 ? 'bg-amber-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 inline-block">
                          {ev.registeredCount || 0}/{ev.maxParticipants} ({percent}%)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-[10px] font-bold rounded uppercase border ${
                            isFull
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : percent >= 80
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}
                        >
                          {isFull ? 'Full' : percent >= 80 ? 'Closing Soon' : 'Open'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditEvent(ev)}
                            title="Edit"
                            className="p-1.5 text-blue-400 hover:bg-blue-500/15 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteEvent(ev)}
                            title="Delete"
                            className="p-1.5 text-red-400 hover:bg-red-500/15 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Info & Export Banner matching Elegant Dark HTML */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/50">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              Real-time Traffic Nodes
            </h3>
            <div className="h-32 flex items-end justify-between gap-1">
              <div className="w-4 bg-blue-600 rounded-t" style={{ height: '40%' }}></div>
              <div className="w-4 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
              <div className="w-4 bg-blue-400 rounded-t" style={{ height: '30%' }}></div>
              <div className="w-4 bg-blue-600 rounded-t" style={{ height: '85%' }}></div>
              <div className="w-4 bg-blue-500 rounded-t" style={{ height: '45%' }}></div>
              <div className="w-4 bg-blue-600 rounded-t" style={{ height: '70%' }}></div>
              <div className="w-4 bg-blue-400 rounded-t" style={{ height: '95%' }}></div>
              <div className="w-4 bg-blue-500 rounded-t" style={{ height: '50%' }}></div>
            </div>
            <div className="mt-4 flex justify-between text-[10px] uppercase text-slate-500 font-bold tracking-widest">
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl shadow-blue-900/40 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-white text-lg leading-tight">Export Monthly Report</h3>
              <p className="text-blue-100 text-sm mt-2 opacity-80">
                Aggregated registration & participant data across all Spring Boot REST modules.
              </p>
              <button
                onClick={handleExportExcel}
                className="mt-6 w-full bg-white text-blue-600 py-3 rounded-xl font-bold shadow-md hover:bg-blue-50 transition-colors"
              >
                Download .XLSX
              </button>
            </div>
            {/* Decorative circle */}
            <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
