import React from 'react';
import { ObjectiveStatus, StudyObjective } from '../types/objective';
import { BookOpen, CheckCircle2, Clock, Layers } from 'lucide-react';

interface StatsOverviewProps {
  objectives: StudyObjective[];
  selectedFilter: 'todos' | ObjectiveStatus;
  onSelectFilter: (filter: 'todos' | ObjectiveStatus) => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  objectives,
  selectedFilter,
  onSelectFilter,
}) => {
  const total = objectives.length;
  const naoIniciados = objectives.filter((o) => o.status === 'nao_iniciado').length;
  const emAndamento = objectives.filter((o) => o.status === 'em_andamento').length;
  const concluidos = objectives.filter((o) => o.status === 'concluido').length;

  const completionPercentage = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
        {/* Total */}
        <button
          type="button"
          onClick={() => onSelectFilter('todos')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'todos'
              ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/30 shadow-xs'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:bg-stone-50/60'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
            <Layers className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-serif">{total}</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Objetivos no plano</div>
        </button>

        {/* Não Iniciados */}
        <button
          type="button"
          onClick={() => onSelectFilter('nao_iniciado')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'nao_iniciado'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30 shadow-xs'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:bg-stone-50/60'
          }`}
        >
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Não iniciados</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-900 font-serif">{naoIniciados}</div>
          <div className="text-[11px] text-amber-700/80 mt-0.5">Aguardando início</div>
        </button>

        {/* Em Andamento */}
        <button
          type="button"
          onClick={() => onSelectFilter('em_andamento')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'em_andamento'
              ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-400/30 shadow-xs'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:bg-stone-50/60'
          }`}
        >
          <div className="flex items-center justify-between text-blue-700 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Em andamento</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900 font-serif">{emAndamento}</div>
          <div className="text-[11px] text-blue-700/80 mt-0.5">Em estudo ativo</div>
        </button>

        {/* Concluídos */}
        <button
          type="button"
          onClick={() => onSelectFilter('concluido')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'concluido'
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30 shadow-xs'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:bg-stone-50/60'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-900 font-serif">{concluidos}</div>
          <div className="text-[11px] text-emerald-700/80 mt-0.5">Estudos finalizados</div>
        </button>
      </div>

      {/* Progress Bar */}
      {total > 0 && (
        <div className="bg-white p-3 rounded-xl border border-stone-200/70 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-700 w-full sm:w-auto">
            <span>Progresso Geral dos Estudos:</span>
            <span className="font-bold text-amber-900">{completionPercentage}% concluído</span>
          </div>
          <div className="w-full sm:w-64 h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
            <div
              className="h-full bg-linear-to-r from-amber-600 to-emerald-600 transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
