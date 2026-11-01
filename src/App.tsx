/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ObjectiveFormData, ObjectiveStatus, StudyObjective } from './types/objective';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { ObjectiveCard } from './components/ObjectiveCard';
import { ObjectiveFormModal } from './components/ObjectiveFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { Check, Heart, BookOpen } from 'lucide-react';

export default function App() {
  const [objectives, setObjectives] = useState<StudyObjective[]>([]);
  const [statusFilter, setStatusFilter] = useState<'todos' | ObjectiveStatus>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'deadline' | 'createdAt' | 'title'>('deadline');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState<StudyObjective | null>(null);
  const [deletingObjective, setDeletingObjective] = useState<StudyObjective | null>(null);

  // User feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = storageService.getObjectives();
    setObjectives(loaded);
  }, []);

  // Filtered and Sorted Objectives
  const filteredObjectives = useMemo(() => {
    let result = [...objectives];

    // Filter by status
    if (statusFilter !== 'todos') {
      result = result.filter((obj) => obj.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (obj) =>
          obj.title.toLowerCase().includes(q) ||
          (obj.description && obj.description.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'deadline') {
        return (a.deadline || '').localeCompare(b.deadline || '');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // createdAt descending (newest first)
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

    return result;
  }, [objectives, statusFilter, searchQuery, sortBy]);

  // Actions
  const handleOpenNewModal = () => {
    setEditingObjective(null);
    setIsFormOpen(true);
  };

  const handleEdit = (objective: StudyObjective) => {
    setEditingObjective(objective);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: ObjectiveFormData) => {
    if (editingObjective) {
      storageService.updateObjective(editingObjective.id, formData);
      showToast('Objetivo atualizado com sucesso!');
    } else {
      storageService.createObjective(formData);
      showToast('Novo objetivo de estudo cadastrado!');
    }
    setObjectives(storageService.getObjectives());
    setIsFormOpen(false);
    setEditingObjective(null);
  };

  const handleStatusChange = (id: string, newStatus: ObjectiveStatus) => {
    storageService.updateObjective(id, { status: newStatus });
    setObjectives(storageService.getObjectives());
    showToast('Status do estudo atualizado!');
  };

  const handleConfirmDelete = () => {
    if (!deletingObjective) return;
    storageService.deleteObjective(deletingObjective.id);
    setObjectives(storageService.getObjectives());
    showToast('Objetivo excluído com sucesso.');
    setDeletingObjective(null);
  };

  const handleLoadSamples = () => {
    const samples = storageService.resetToSamples();
    setObjectives(samples);
    showToast('Exemplos de estudo bíblico carregados!');
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-stone-900 text-stone-100 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-stone-700/60">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        totalCount={objectives.length}
        onOpenNewModal={handleOpenNewModal}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Stats & Progress Overview */}
        <StatsOverview
          objectives={objectives}
          selectedFilter={statusFilter}
          onSelectFilter={setStatusFilter}
        />

        {/* Search, Filter & Sort Bar */}
        {objectives.length > 0 && (
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        )}

        {/* Content Section: Objective Cards or Empty States */}
        {objectives.length === 0 ? (
          <EmptyState
            type="no_data"
            onOpenNewModal={handleOpenNewModal}
            onLoadSamples={handleLoadSamples}
          />
        ) : filteredObjectives.length === 0 ? (
          <EmptyState
            type="no_filter_match"
            onOpenNewModal={handleOpenNewModal}
            onResetFilter={() => {
              setStatusFilter('todos');
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
              <span>
                Exibindo{' '}
                <strong className="text-stone-800">{filteredObjectives.length}</strong>{' '}
                {filteredObjectives.length === 1 ? 'objetivo' : 'objetivos'}{' '}
                {statusFilter !== 'todos' ? `(${statusFilter.replace('_', ' ')})` : ''}
              </span>
              {searchQuery && (
                <span>Filtrado por: "{searchQuery}"</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredObjectives.map((objective) => (
                <ObjectiveCard
                  key={objective.id}
                  objective={objective}
                  onEdit={handleEdit}
                  onRequestDelete={setDeletingObjective}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/70 py-6 text-center text-xs text-stone-500 mt-auto">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <p className="italic text-stone-600 font-serif">
            "Lâmpada para os meus pés é tua palavra e luz, para o meu caminho." — Salmos 119:105
          </p>
          <div className="flex items-center justify-center gap-1 text-[11px] text-stone-400">
            <span>BibleStudyFlow</span>
            <span>•</span>
            <span>Organização devocional e estudos das Escrituras</span>
          </div>
        </div>
      </footer>

      {/* Form Modal (Create / Edit) */}
      <ObjectiveFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingObjective(null);
        }}
        onSubmit={handleFormSubmit}
        initialObjective={editingObjective}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingObjective)}
        objective={deletingObjective}
        onClose={() => setDeletingObjective(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
