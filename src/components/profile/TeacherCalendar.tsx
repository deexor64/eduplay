"use client"

import React from "react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "class" | "meeting" | "deadline" | "personal";
}

interface TeacherCalendarProps {
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export default function TeacherCalendar(props: TeacherCalendarProps) {
  const { calendarEvents, addCalendarEvent } = props;

  const handleAddEvent = () => {
    const newEvent = {
      title: "New Event",
      date: new Date(Date.now() + 86400000),
      time: "10:00 AM",
      type: "personal" as const
    };
    addCalendarEvent(newEvent);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        Upcoming Events
      </h3>
      
      <div className="space-y-3">
        {calendarEvents.map((event) => (
          <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              event.type === 'class' ? 'bg-blue-500' :
              event.type === 'meeting' ? 'bg-green-500' :
              event.type === 'deadline' ? 'bg-red-500' :
              'bg-gray-500'
            }`}></div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{event.title}</h4>
              <p className="text-sm text-gray-600">
                {event.date.toLocaleDateString()} at {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={handleAddEvent}
      >
        Add Event
      </button>
    </div>
  );
}
