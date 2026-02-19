import React from 'react';
import { ChevronRight } from 'lucide-react';

export type ScheduleColor = 'red' | 'orange' | 'blue' | 'purple' | 'green' | 'indigo';

interface ScheduleItemProps {
  title: string;
  subtitle?: string;
  timeLabel: string;
  timeSubLabel?: string;
  color: ScheduleColor;
  onClick?: () => void;
}

const COLOR_MAP: Record<ScheduleColor, { bg: string; text: string; dot: string }> = {
  red: { bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-500' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-500', dot: 'bg-orange-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-500' },
  green: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', dot: 'bg-indigo-500' },
};

const ScheduleItemComponent: React.FC<ScheduleItemProps> = ({
  title,
  subtitle,
  timeLabel,
  timeSubLabel,
  color,
  onClick,
}) => {
  const colors = COLOR_MAP[color];

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group mb-3"
    >
      <div className="flex items-center gap-4">
        <div
          className={`h-12 w-12 ${colors.bg} rounded-xl flex flex-col items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
        >
          <span className={`text-xs font-bold ${colors.text} leading-none`}>
            {timeLabel}
          </span>
          {timeSubLabel && (
            <span className={`text-[10px] font-medium ${colors.text} uppercase mt-0.5`}>
              {timeSubLabel}
            </span>
          )}
        </div>
        <div>
          {subtitle && (
            <div className="flex items-center gap-2 mb-1">
              <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
              <span className="text-xs font-medium text-gray-500">{subtitle}</span>
            </div>
          )}
          <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
        </div>
      </div>
      <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

export default ScheduleItemComponent;
