/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, Mail, Shield, ArrowRight, UserCheck, Terminal } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
  onNavigate: (path: string) => void;
  demoUsers: User[];
  onSwitchUser: (userId: number) => void;
}

export const Login: React.FC<LoginProps> = ({
  onLogin,
  onNavigate,
  demoUsers,
  onSwitchUser,
}) => {
  const [email, setEmail] = useState('admin@eventportal.enterprise');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid email or password. You can also click a demo user badge below.');
    } else {
      onNavigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-[#1e293b] rounded-3xl border border-slate-700/80 p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Login to Event.Pro</h1>
          <p className="text-xs text-slate-400">
            Enterprise Portal • Authenticated via Spring Security Stateless JWT
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eventportal.enterprise"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-colors"
          >
            <span>Sign In with JWT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Instant Demo Switcher */}
        <div className="pt-4 border-t border-slate-700 space-y-3">
          <div className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick-Login Demo Accounts
          </div>
          <div className="grid grid-cols-1 gap-2">
            {demoUsers.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  onSwitchUser(u.id);
                  onNavigate('/');
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">{u.fullName}</div>
                    <div className="text-[10px] text-slate-400">{u.email}</div>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    u.role === 'ROLE_ADMIN'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {u.role === 'ROLE_ADMIN' ? 'SUPER ADMIN' : 'USER'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <span className="text-xs text-slate-400">Don't have an account? </span>
          <button
            onClick={() => onNavigate('/register')}
            className="text-xs text-blue-400 font-bold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
