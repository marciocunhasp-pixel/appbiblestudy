import React from 'react';
import { ObjectiveStatus } from '../types/objective';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'todos' | ObjectiveStatus;
  onStatusFilterChange: (status: 'todos' | ObjectiveStatus) => void;
  sortBy: 'deadline' | 'createdAt' | 'title';
  onSortByChange: (sortBy: 'deadline' | 'createdAt' | 'title') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por livro, tema ou anotação..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50/80 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs text-stone-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Ordenar:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as 'deadline' | 'createdAt' | 'title')}
            className="text-xs font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/20 cursor-pointer"
          >
            <option value="deadline">Prazo mais próximo</option>
            <option value="createdAt">Mais recentes primeiro</option>
            <option value="title">Título (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 pt-1 text-xs">
        <span className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider mr-1 hidden sm:inline">
          Filtro:
        </span>
        <button
          type="button"
          onClick={() => onStatusFilterChange('todos')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
            statusFilter === 'todos'
              ? 'bg-amber-800 text-white shadow-2xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
          }`}
        >
          Todos os status
        </button>
        <button
          type="button"
          onClick={() => onStatusFilterChange('nao_iniciado')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
            statusFilter === 'nao_iniciado'
              ? 'bg-amber-800 text-white shadow-2xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
          }`}
        >
          Não iniciados
        </button>
        <button
          type="button"
          onClick={() => onStatusFilterChange('em_andamento')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
            statusFilter === 'em_andamento'
              ? 'bg-blue-800 text-white shadow-2xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
          }`}
        >
          Em andamento
        </button>
        <button
          type="button"
          onClick={() => onStatusFilterChange('concluido')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
            statusFilter === 'concluido'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
          }`}
        >
          Concluídos
        </button>
      </div>
    </div>
  );
};
