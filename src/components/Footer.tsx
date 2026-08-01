/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal, Github, Shield, Cpu, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e293b]/90 border-t border-slate-700/80 text-slate-400 py-8 px-8 mt-auto select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">
              E
            </div>
            <span className="text-base font-bold text-white tracking-tight font-mono">
              EVENT.PRO
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enterprise Event Management Portal powered by Java 21, Spring Boot 3.2, Spring Security (JWT), Hibernate ORM, and MySQL 8.0.
          </p>
        </div>

        {/* Col 2: Stack specs */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Backend Stack
          </div>
          <ul className="text-xs space-y-1.5 text-slate-400 font-mono">
            <li className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Java 21 (Virtual Threads)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Spring Boot 3.2 REST API</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>MySQL 8.0 & Hibernate JPA</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Security & Features */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Security & Tickets
          </div>
          <ul className="text-xs space-y-1.5 text-slate-400">
            <li className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Stateless JWT Auth (BCrypt)</span>
            </li>
            <li>QR Code Check-in Verification</li>
            <li>PDF Ticket Generation & Export</li>
          </ul>
        </div>

        {/* Col 4: Status */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            System Node Status
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">API Endpoint</span>
              <span className="text-emerald-400 font-mono">/api/v1/*</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Uptime</span>
              <span className="text-blue-400 font-mono">99.98%</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} Event.Pro Enterprise Systems. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
