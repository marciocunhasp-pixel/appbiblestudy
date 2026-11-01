import React from 'react';
import { BookOpen, Plus, RefreshCw, SearchX } from 'lucide-react';

interface EmptyStateProps {
  type: 'no_data' | 'no_filter_match';
  onOpenNewModal: () => void;
  onResetFilter?: () => void;
  onLoadSamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  onOpenNewModal,
  onResetFilter,
  onLoadSamples,
}) => {
  if (type === 'no_filter_match') {
    return (
      <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
          Nenhum objetivo encontrado
        </h3>
        <p className="text-sm text-stone-600 mb-6 max-w-sm mx-auto">
          Não há objetivos cadastrados que correspondam ao filtro ou busca selecionada.
        </p>
        <div className="flex items-center justify-center gap-3">
          {onResetFilter && (
            <button
              type="button"
              onClick={onResetFilter}
              className="px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition-colors cursor-pointer"
            >
              Ver todos os objetivos
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-xs">
      <div className="w-16 h-16 rounded-3xl bg-amber-100/70 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto mb-5 shadow-2xs">
        <BookOpen className="w-8 h-8 stroke-[2]" />
      </div>

      <h3 className="text-xl font-bold text-stone-900 font-serif mb-2">
        Nenhum objetivo cadastrado ainda
      </h3>

      <p className="text-sm text-stone-600 mb-4 leading-relaxed max-w-md mx-auto">
        Comece cadastrando seu primeiro plano de estudo bíblico. Defina livros, cartas apostólicas ou temas teológicos com metas e prazos claros.
      </p>

      {/* Inspirational Verse */}
      <blockquote className="my-6 p-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs italic text-stone-700 max-w-md mx-auto">
        "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos."
        <span className="block mt-1 font-semibold not-italic text-amber-800">
          — Provérbios 16:3
        </span>
      </blockquote>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onOpenNewModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Cadastrar Primeiro Objetivo</span>
        </button>

        {onLoadSamples && (
          <button
            type="button"
            onClick={onLoadSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-medium text-sm rounded-xl border border-stone-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Carregar Exemplos de Estudo</span>
          </button>
        )}
      </div>
    </div>
  );
};
