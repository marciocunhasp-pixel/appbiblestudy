import React from 'react';
import { ObjectiveStatus, STATUS_CONFIG, StudyObjective } from '../types/objective';
import { Calendar, CheckCircle2, Clock, BookOpen, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface ObjectiveCardProps {
  objective: StudyObjective;
  onEdit: (objective: StudyObjective) => void;
  onRequestDelete: (objective: StudyObjective) => void;
  onStatusChange: (id: string, newStatus: ObjectiveStatus) => void;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  objective,
  onEdit,
  onRequestDelete,
  onStatusChange,
}) => {
  const currentStatusConfig = STATUS_CONFIG[objective.status];

  // Calculate deadline status
  const parseDeadlineInfo = () => {
    if (!objective.deadline) return null;

    // Use date string parsing in local time
    const [year, month, day] = objective.deadline.split('-').map(Number);
    const deadlineDate = new Date(year, month - 1, day);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Formatted date in pt-BR
    const formattedDate = deadlineDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    let badgeClass = 'text-stone-600 bg-stone-100 border-stone-200';
    let helperText = '';
    let isUrgent = false;

    if (objective.status === 'concluido') {
      helperText = 'Concluído';
      badgeClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (diffDays < 0) {
      const daysOverdue = Math.abs(diffDays);
      helperText = `Atrasado há ${daysOverdue} ${daysOverdue === 1 ? 'dia' : 'dias'}`;
      badgeClass = 'text-rose-700 bg-rose-50 border-rose-200';
      isUrgent = true;
    } else if (diffDays === 0) {
      helperText = 'Vence hoje!';
      badgeClass = 'text-amber-800 bg-amber-100 border-amber-300 font-semibold';
      isUrgent = true;
    } else if (diffDays <= 3) {
      helperText = `Vence em ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
      badgeClass = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      helperText = `Faltam ${diffDays} dias`;
    }

    return { formattedDate, helperText, badgeClass, isUrgent };
  };

  const deadlineInfo = parseDeadlineInfo();

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-5 space-y-3.5">
        {/* Top bar: Status selector and Actions */}
        <div className="flex items-center justify-between gap-2">
          {/* Status badge with interactive selector */}
          <div className="relative inline-flex items-center">
            <select
              aria-label="Alterar status do objetivo"
              value={objective.status}
              onChange={(e) => onStatusChange(objective.id, e.target.value as ObjectiveStatus)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer appearance-none pr-6 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${currentStatusConfig.badgeBg} ${currentStatusConfig.badgeText} ${currentStatusConfig.borderClass}`}
            >
              <option value="nao_iniciado">Não iniciado</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
            <div className="pointer-events-none absolute right-2 text-current text-[10px]">▼</div>
          </div>

          {/* Edit & Delete Action Buttons */}
          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onEdit(objective)}
              title="Editar objetivo"
              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onRequestDelete(objective)}
              title="Excluir objetivo"
              className="p-1.5 rounded-lg text-stone-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3
            className={`text-base font-bold text-stone-900 leading-snug font-serif ${
              objective.status === 'concluido' ? 'line-through text-stone-500' : ''
            }`}
          >
            {objective.title}
          </h3>
        </div>

        {/* Description */}
        {objective.description && (
          <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed whitespace-pre-line">
            {objective.description}
          </p>
        )}
      </div>

      {/* Footer bar: Deadline and quick complete button */}
      <div className="bg-stone-50/70 border-t border-stone-100 px-5 py-3 flex items-center justify-between gap-2 text-xs">
        {/* Deadline indicator */}
        {deadlineInfo ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1 text-stone-600 font-medium">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Prazo: {deadlineInfo.formattedDate}</span>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-medium ${deadlineInfo.badgeClass}`}
            >
              {deadlineInfo.isUrgent && <AlertCircle className="w-3 h-3 text-current" />}
              {deadlineInfo.helperText}
            </span>
          </div>
        ) : (
          <span className="text-stone-400 italic">Sem prazo definido</span>
        )}

        {/* Quick status toggle button */}
        {objective.status !== 'concluido' ? (
          <button
            type="button"
            onClick={() => onStatusChange(objective.id, 'concluido')}
            title="Marcar como concluído"
            className="inline-flex items-center gap-1 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1 rounded-md transition-colors cursor-pointer font-medium ml-auto"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Concluir</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onStatusChange(objective.id, 'em_andamento')}
            title="Reabrir estudo"
            className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-700 px-2 py-1 rounded-md transition-colors cursor-pointer ml-auto"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reabrir</span>
          </button>
        )}
      </div>
    </div>
  );
};
