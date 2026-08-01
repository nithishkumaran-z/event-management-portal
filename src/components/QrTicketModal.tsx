/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Calendar, MapPin, Ticket, CheckCircle, ShieldCheck } from 'lucide-react';
import { Registration } from '../types';
import { apiService } from '../services/apiService';

interface QrTicketModalProps {
  registration: Registration | null;
  onClose: () => void;
}

export const QrTicketModal: React.FC<QrTicketModalProps> = ({ registration, onClose }) => {
  if (!registration) return null;

  const handleDownloadPdf = () => {
    apiService.downloadPdfTicket(registration);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1e293b] border border-slate-700 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-blue-200 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Event Pass</span>
          </div>

          <h2 className="text-xl font-bold leading-tight">{registration.eventName}</h2>

          <div className="mt-3 flex items-center justify-between text-xs text-blue-100 font-mono">
            <span>Code: {registration.registrationCode}</span>
            <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 font-bold rounded uppercase">
              {registration.status}
            </span>
          </div>
        </div>

        {/* QR Code Canvas Section */}
        <div className="p-8 flex flex-col items-center justify-center bg-[#0f172a]/50 border-b border-slate-700">
          <div className="p-4 bg-white rounded-2xl shadow-xl">
            <QRCodeSVG
              value={`https://eventportal.app/verify/${registration.qrCodeToken}`}
              size={180}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="mt-3 text-[11px] text-slate-400 font-mono text-center">
            Token: {registration.qrCodeToken}
          </div>
          <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Show this QR at the venue entrance for instant check-in</span>
          </div>
        </div>

        {/* Ticket Metadata */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-400 font-medium">PARTICIPANT</div>
              <div className="text-white font-semibold mt-0.5 text-sm">
                {registration.userFullName}
              </div>
              <div className="text-slate-500 text-[11px] truncate">
                {registration.userEmail}
              </div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">TICKET TYPE</div>
              <div className="text-blue-400 font-bold mt-0.5 text-sm uppercase">
                {registration.ticketType}
              </div>
              <div className="text-slate-500 text-[11px]">
                Reg: {registration.registrationDate}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-700/60 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                {registration.eventDate} at {registration.eventTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate">{registration.venue}</span>
            </div>
          </div>

          {/* Download PDF action */}
          <button
            onClick={handleDownloadPdf}
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Official .PDF Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
};
