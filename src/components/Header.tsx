import React from 'react';
import { BookOpen, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  onOpenNewModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ totalCount, onOpenNewModal }) => {
  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur-sm sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-xs">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-stone-900 font-serif">
                BibleStudyFlow
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Estudo Cristão
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Organize seus passos e metas nas Escrituras Sagradas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg text-xs font-medium text-stone-600 border border-stone-200">
            <span>Objetivos cadastrados:</span>
            <span className="font-bold text-stone-900 bg-white px-1.5 py-0.5 rounded shadow-2xs">
              {totalCount}
            </span>
          </div>

          <button
            onClick={onOpenNewModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-medium text-sm rounded-xl shadow-xs transition-all hover:shadow cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
