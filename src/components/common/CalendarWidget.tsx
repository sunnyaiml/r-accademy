import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarWidget: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const goToPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={goToPrev}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={18} className="text-gray-500" />
          </button>
          <button
            onClick={goToNext}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-y-4 text-center text-sm mb-2">
        {DAY_LABELS.map((day) => (
          <span key={day} className="text-gray-400 font-medium text-xs">
            {day}
          </span>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-3 text-center text-sm">
        {blanks.map((b) => (
          <span key={`blank-${b}`} />
        ))}
        {days.map((day) => (
          <button
            key={day}
            className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full transition-all duration-200 text-sm ${
              isToday(day)
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-300 font-bold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
