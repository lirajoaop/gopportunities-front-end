'use client';

import { useState, useEffect } from 'react';
import { openingsApi } from '../lib/api';
import OpeningCard from '../components/OpeningCard';
import OpeningForm from '../components/OpeningForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Home() {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpening, setEditingOpening] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRemote, setFilterRemote] = useState('all');

  useEffect(() => {
    fetchOpenings();
  }, []);

  const fetchOpenings = async () => {
    try {
      setLoading(true);
      const data = await openingsApi.getAll();
      setOpenings(data);
    } catch (error) {
      showToast(`Failed to fetch openings: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleCreateOpening = async (formData) => {
    try {
      await openingsApi.create(formData);
      showToast('Opening created successfully!');
      setIsModalOpen(false);
      fetchOpenings();
    } catch (error) {
      showToast(`Failed to create opening: ${error.message}`, 'error');
    }
  };

  const handleUpdateOpening = async (formData) => {
    try {
      await openingsApi.update(editingOpening.id, formData);
      showToast('Opening updated successfully!');
      setIsModalOpen(false);
      setEditingOpening(null);
      fetchOpenings();
    } catch (error) {
      showToast(`Failed to update opening: ${error.message}`, 'error');
    }
  };

  const handleDeleteOpening = async (opening) => {
    if (!confirm(`Are you sure you want to delete the opening for ${opening.role} at ${opening.company}?`)) {
      return;
    }

    try {
      await openingsApi.delete(opening.id);
      showToast('Opening deleted successfully!');
      fetchOpenings();
    } catch (error) {
      showToast(`Failed to delete opening: ${error.message}`, 'error');
    }
  };

  const handleEdit = (opening) => {
    setEditingOpening(opening);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOpening(null);
  };

  const filteredOpenings = openings.filter((opening) => {
    if (!opening || !opening.role || !opening.company || !opening.location) {
      return false;
    }

    const matchesSearch =
      opening.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opening.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opening.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRemote =
      filterRemote === 'all' ||
      (filterRemote === 'remote' && opening.remote) ||
      (filterRemote === 'onsite' && !opening.remote);

    return matchesSearch && matchesRemote;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Go Opportunities</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">Discover and manage job openings</p>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 4v16m8-8H4" />
                </svg>
                Add New Opening
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by role, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Work Type
              </label>
              <select
                value={filterRemote}
                onChange={(e) => setFilterRemote(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors [&>option]:bg-white [&>option]:dark:bg-slate-700 [&>option]:text-slate-900 [&>option]:dark:text-white"
              >
                <option value="all">All Positions</option>
                <option value="remote">Remote Only</option>
                <option value="onsite">On-site Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Openings</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{openings.length}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Remote Positions</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {openings.filter(o => o.remote).length}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Filtered Results</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{filteredOpenings.length}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Openings Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredOpenings.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No openings found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm || filterRemote !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first job opening'}
            </p>
            {!searchTerm && filterRemote === 'all' && (
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Add Your First Opening
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpenings.map((opening) => (
              <OpeningCard
                key={opening.id}
                opening={opening}
                onEdit={handleEdit}
                onDelete={handleDeleteOpening}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingOpening ? 'Edit Job Opening' : 'Create New Job Opening'}
      >
        <OpeningForm
          initialData={editingOpening}
          onSubmit={editingOpening ? handleUpdateOpening : handleCreateOpening}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
