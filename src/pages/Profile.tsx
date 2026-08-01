/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User as UserIcon, Mail, Building2, Phone, Shield, Key, Save, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface ProfileProps {
  currentUser: User | null;
  onUpdateProfile: (updatedUser: User) => void;
}

export const Profile: React.FC<ProfileProps> = ({ currentUser, onUpdateProfile }) => {
  if (!currentUser) return null;

  const [fullName, setFullName] = useState(currentUser.fullName as string);
  const [organization, setOrganization] = useState(currentUser.organization);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [savedNotice, setSavedNotice] = useState(false);

  // Password modal/state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      fullName,
      organization,
      bio,
      avatarUrl,
      phoneNumber,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordNotice('Please fill out all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice('New passwords do not match.');
      return;
    }
    setPasswordNotice('Password successfully re-hashed with BCrypt ($2a$10$E9uW...)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Account & User Profile</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your personal information, organization credentials, and Spring Security JWT settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Role Summary */}
        <div className="bg-[#1e293b] rounded-3xl border border-slate-700/60 p-6 flex flex-col items-center text-center gap-4 h-fit shadow-xl">
          <div className="relative">
            <img
              src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-slate-700 shadow-xl"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#1e293b]"></span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">{fullName}</h2>
            <div className="text-xs text-slate-400 mt-0.5">{currentUser.email}</div>
          </div>

          <div className="w-full pt-3 border-t border-slate-700/60 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Security Role:</span>
              <span className="font-mono font-bold text-blue-400 uppercase">
                {currentUser.role === 'ROLE_ADMIN' ? 'SUPER_ADMIN' : 'USER'}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span>Organization:</span>
              <span className="text-slate-200 font-medium truncate max-w-[150px]">
                {organization}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span>Member Since:</span>
              <span className="font-mono text-slate-300">{currentUser.createdAt}</span>
            </div>
          </div>

          <div className="w-full pt-3 border-t border-slate-700/60">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-left space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                JWT Token Authorization
              </div>
              <div className="text-[11px] text-emerald-400 font-mono truncate">
                Bearer eyJhbGciOiJIUzI1Ni...
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Profile Form & Password Security */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Form */}
          <form
            onSubmit={handleProfileSubmit}
            className="bg-[#1e293b] rounded-3xl border border-slate-700/60 p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-blue-400" />
                <span>Personal & Organization Profile</span>
              </h2>
              {savedNotice && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Profile Saved
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase">
                  Email Address (Read-only)
                </label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase">
                  Organization
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Biography / Professional Summary
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-blue-900/20 flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>

          {/* Change Password Form */}
          <form
            onSubmit={handlePasswordChange}
            className="bg-[#1e293b] rounded-3xl border border-slate-700/60 p-8 shadow-xl space-y-5"
          >
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Security — Update Account Password</span>
            </h2>

            {passwordNotice && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300">
                {passwordNotice}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Confirm New</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-5 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                Update Password (BCrypt)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
