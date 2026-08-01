/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Ticket, 
  Users, 
  PlusCircle, 
  User as UserIcon, 
  Server, 
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  currentUser,
  onLogout
}) => {
  const isAdmin = currentUser?.role === 'ROLE_ADMIN';

  const navItems = [
    { name: 'Home Portal', path: '/', icon: Calendar },
    { name: 'Events Registry', path: '/events', icon: Calendar },
    { name: 'My Registrations', path: '/my-registrations', icon: Ticket },
    { name: 'User Profile', path: '/profile', icon: UserIcon },
  ];

  if (isAdmin) {
    navItems.unshift({ name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard });
    navItems.push({ name: 'Create Event', path: '/admin/events/new', icon: PlusCircle });
  }

  return (
    <aside className="w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6">
        <div 
          onClick={() => onNavigate('/')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
            E
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-mono">
            EVENT.PRO
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || 
            (item.path !== '/' && currentPath.startsWith(item.path));
          
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Admin Quick Status badge & User Controls */}
      <div className="p-4 border-t border-slate-700 space-y-4">
        {currentUser && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-2 overflow-hidden">
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser.fullName as string}
                className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0"
              />
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">
                  {currentUser.fullName}
                </div>
                <div className="text-[10px] text-blue-400 uppercase font-mono tracking-tighter">
                  {currentUser.role === 'ROLE_ADMIN' ? 'SUPER ADMIN' : 'PARTICIPANT'}
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Logout"
              className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-700/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/30">
          <div className="text-[10px] uppercase text-slate-500 font-bold mb-2 tracking-widest flex items-center justify-between">
            <span>System Status</span>
            <span className="font-mono text-slate-400">v2.4.1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm text-emerald-400 font-medium">Spring Boot API Online</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>MySQL DB: Connected</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          </div>
        </div>
      </div>
    </aside>
  );
};
