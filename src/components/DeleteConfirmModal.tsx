import React from 'react';
import { StudyObjective } from '../types/objective';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  objective: StudyObjective | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  objective,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !objective) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5 flex-1">
              <h3 id="delete-dialog-title" className="text-base font-bold text-stone-900 font-serif">
                Confirmar exclusão de objetivo?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Você está prestes a remover o objetivo:
              </p>
              <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl text-xs font-semibold text-stone-800 break-words">
                "{objective.title}"
              </div>
              <p className="text-xs text-stone-500 pt-1">
                Esta ação não poderá ser desfeita após a confirmação.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-200/60 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium text-sm rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Sim, excluir objetivo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
