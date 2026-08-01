/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Image as ImageIcon, Calendar, Clock, MapPin, Building2, Users, DollarSign, AlertCircle } from 'lucide-react';
import { Event } from '../types';

interface AddEditEventProps {
  eventToEdit?: Event | null;
  onSave: (eventData: Omit<Event, 'id' | 'createdAt' | 'registeredCount'>, id?: number) => void;
  onCancel: () => void;
}

export const AddEditEvent: React.FC<AddEditEventProps> = ({
  eventToEdit,
  onSave,
  onCancel,
}) => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('09:00');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('Spring Cloud Consortium');
  const [maxParticipants, setMaxParticipants] = useState(250);
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [eventImageUrl, setEventImageUrl] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);
  const [published, setPublished] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.eventName);
      setDescription(eventToEdit.description);
      setCategory(eventToEdit.category);
      setEventDate(eventToEdit.eventDate);
      setEventTime(eventToEdit.eventTime);
      setVenue(eventToEdit.venue);
      setOrganizer(eventToEdit.organizer);
      setMaxParticipants(eventToEdit.maxParticipants);
      setRegistrationDeadline(eventToEdit.registrationDeadline.replace(' ', 'T').substring(0, 16));
      setEventImageUrl(eventToEdit.eventImageUrl);
      setTicketPrice(eventToEdit.ticketPrice);
      setPublished(eventToEdit.published);
    } else {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      const dateStr = defaultDate.toISOString().split('T')[0];
      setEventDate(dateStr);
      setRegistrationDeadline(`${dateStr}T18:00`);
      setEventImageUrl('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800');
    }
  }, [eventToEdit]);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!eventName.trim()) errs.eventName = 'Event Name is required.';
    if (!description.trim() || description.length < 20) {
      errs.description = 'Please provide a detailed description (at least 20 characters).';
    }
    if (!eventDate) errs.eventDate = 'Event date is required.';
    if (!venue.trim()) errs.venue = 'Venue or online platform URL is required.';
    if (!organizer.trim()) errs.organizer = 'Organizer name is required.';
    if (maxParticipants <= 0) errs.maxParticipants = 'Capacity must be greater than 0.';
    if (!registrationDeadline) errs.registrationDeadline = 'Registration deadline is required.';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave(
      {
        eventName,
        description,
        category,
        eventDate,
        eventTime,
        venue,
        organizer,
        maxParticipants: Number(maxParticipants),
        registrationDeadline,
        eventImageUrl: eventImageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        ticketPrice: Number(ticketPrice),
        published,
        createdBy: 1,
      },
      eventToEdit?.id
    );
  };

  const categories = [
    'Technology',
    'Artificial Intelligence',
    'Cybersecurity',
    'Design & UX',
    'Finance & FinTech',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Back</span>
        </button>

        <h1 className="text-2xl font-bold text-white tracking-tight">
          {eventToEdit ? `Edit Event (#${eventToEdit.id})` : 'Create New Event Module'}
        </h1>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-[#1e293b] rounded-3xl border border-slate-700/60 p-8 shadow-2xl space-y-8">
        {/* Section 1: Core Details */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 pb-3">
            1. Event Information & Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Event Name / Title *
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Global Java 21 & Spring Boot 3 Enterprise Summit"
                className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                  errors.eventName ? 'border-red-500' : 'border-slate-700'
                }`}
              />
              {errors.eventName && (
                <div className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.eventName}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Category Domain *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase">
              Full Event Description *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive summary of keynotes, workshops, target audience, and speakers..."
              className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-slate-700'
              }`}
            />
            {errors.description && (
              <div className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.description}</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Date, Time & Venue */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 pb-3">
            2. Schedule & Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Event Date *</span>
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              {errors.eventDate && (
                <div className="text-xs text-red-400">{errors.eventDate}</div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Start Time (UTC) *</span>
              </label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Registration Deadline *</span>
              </label>
              <input
                type="datetime-local"
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Venue / Platform URL *</span>
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. San Francisco Convention Center & Hybrid Live"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Organizer Organization *</span>
              </label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="e.g. Spring Cloud Consortium"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Capacity, Tickets & Image */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 pb-3">
            3. Capacity, Pricing & Media Banner
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>Max Participants *</span>
              </label>
              <input
                type="number"
                min={1}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ticket Price ($ USD)</span>
              </label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Publish Status
              </label>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-0"
                  />
                  <span>Published & Visible</span>
                </label>
              </div>
            </div>
          </div>

          {/* Event Image Banner URL */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>Event Banner Image URL (Unsplash or Custom)</span>
            </label>
            <input
              type="url"
              value={eventImageUrl}
              onChange={(e) => setEventImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />

            {/* Preview Banner */}
            {eventImageUrl && (
              <div className="mt-3 relative h-36 w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-800">
                <img
                  src={eventImageUrl}
                  alt="Banner preview"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800';
                  }}
                />
                <div className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] text-slate-300 font-mono">
                  Image Preview
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Footer */}
        <div className="pt-6 border-t border-slate-700 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold border border-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{eventToEdit ? 'Update Event Module' : 'Create & Publish Event'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
