"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faGamepad, faChartLine, faUser, faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';

const items = [
  { key: 'activities', label: 'Activities', icon: faClipboardList, href: '/student/activities' },
  { key: 'games', label: 'Games', icon: faGamepad, href: '/student/games' },
  { key: 'progress', label: 'Progress', icon: faChartLine, href: '/student/progress' },
  { key: 'profile', label: 'Profile', icon: faUser, href: '/student/profile' },
  { key: 'notifications', label: 'Notifications', icon: faBell, href: '/student/notifications' },
  { key: 'logout', label: 'Logout', icon: faSignOut, href: '/auth/signin' },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Dashboard</h1>

        <div className="grid grid-cols-3 gap-8">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => router.push(it.href)}
              className="flex flex-col items-center gap-3 p-6 bg-white/80 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <FontAwesomeIcon icon={it.icon} className="w-8 h-8" />
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-800">{it.label}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
