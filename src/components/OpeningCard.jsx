'use client';

import Card from './Card';
import Button from './Button';
import { formatSalary, formatRelativeTime } from '../utils/formatters';

export default function OpeningCard({ opening, onEdit, onDelete, onView }) {
  return (
    <Card hoverable className="flex flex-col h-full">
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{opening.role}</h3>
            <p className="text-slate-600 dark:text-slate-300 font-medium">{opening.company}</p>
          </div>
          {opening.remote && (
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
              Remote
            </span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-slate-600 dark:text-slate-400">
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{opening.location}</span>
          </div>

          <div className="flex items-center text-slate-600 dark:text-slate-400">
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">{formatSalary(opening.salary)}</span>
          </div>

          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">Posted {formatRelativeTime(opening.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
        <Button
          variant="primary"
          size="sm"
          onClick={() => window.open(opening.link, '_blank')}
          className="flex-1"
        >
          Apply
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(opening)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(opening)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}
