'use client';

import { useEffect } from 'react';
import Button from './Button';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in transition-colors">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{message}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={onConfirm}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
