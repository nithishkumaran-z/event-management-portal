/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Shield, User as UserIcon, Lock, LogIn, UserPlus } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
  onSwitchUser: (userId: number) => void;
  users: User[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onNavigate,
  onSearchSubmit,
  onSwitchUser,
  users
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchInput);
    onNavigate('/events');
  };

  return (
    <header className="h-16 bg-[#1e293b]/80 border-b border-slate-700/80 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-30">
      {/* Global Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700/80 w-96 focus-within:border-blue-500/80 transition-colors">
        <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search events, organizers, or categories..."
          className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 w-full"
        />
      </form>

      {/* Right User & Tools Section */}
      <div className="flex items-center gap-6">
        {/* Quick Demo User Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Switch Test User</span>
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                JWT Authenticated Demo Users
              </div>
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    onSwitchUser(u.id);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs hover:bg-slate-800 transition-colors ${
                    currentUser?.id === u.id ? 'bg-blue-600/10 text-blue-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{u.fullName}</span>
                    <span className="text-[10px] text-slate-500">{u.email}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase ${
                    u.role === 'ROLE_ADMIN' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {u.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1 border border-[#0f172a]"></div>
          <Bell className="text-slate-400 hover:text-slate-200 w-5 h-5 transition-colors" />
        </div>

        {/* Auth User Info or Login */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
          {currentUser ? (
            <div 
              onClick={() => onNavigate('/profile')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {currentUser.fullName}
                </div>
                <div className="text-[10px] uppercase text-blue-500 font-bold tracking-tighter">
                  {currentUser.role === 'ROLE_ADMIN' ? 'Role: SuperAdmin' : 'Role: Participant'}
                </div>
              </div>
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser.fullName as string}
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shadow-lg group-hover:border-blue-500 transition-colors"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('/login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </button>
              <button
                onClick={() => onNavigate('/register')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
