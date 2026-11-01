import React, { useState, useEffect } from 'react';
import { ObjectiveFormData, ObjectiveStatus, StudyObjective } from '../types/objective';
import { X, Calendar, CheckCircle2, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface ObjectiveFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ObjectiveFormData) => void;
  initialObjective?: StudyObjective | null;
}

export const ObjectiveFormModal: React.FC<ObjectiveFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialObjective,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ObjectiveStatus>('nao_iniciado');
  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>({});

  useEffect(() => {
    if (initialObjective) {
      setTitle(initialObjective.title);
      setDescription(initialObjective.description || '');
      setDeadline(initialObjective.deadline || '');
      setStatus(initialObjective.status);
    } else {
      setTitle('');
      setDescription('');
      // Default deadline: 14 days ahead
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 14);
      setDeadline(defaultDate.toISOString().split('T')[0]);
      setStatus('nao_iniciado');
    }
    setErrors({});
  }, [initialObjective, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; deadline?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Por favor, informe o título do seu objetivo de estudo.';
    }

    if (!deadline) {
      newErrors.deadline = 'Por favor, defina um prazo para conclusão.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline,
      status,
    });
    onClose();
  };

  const statusOptions: { value: ObjectiveStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      value: 'nao_iniciado',
      label: 'Não iniciado',
      desc: 'Planejado para começar em breve',
      icon: <Clock className="w-4 h-4 text-amber-600" />,
    },
    {
      value: 'em_andamento',
      label: 'Em andamento',
      desc: 'Atualmente estudando este tema',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
    },
    {
      value: 'concluido',
      label: 'Concluído',
      desc: 'Estudo finalizado com sucesso',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/60">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-stone-900 font-serif">
              {initialObjective ? 'Editar Objetivo de Estudo' : 'Cadastrar Novo Objetivo'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Defina com clareza o que deseja aprender nas Escrituras
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
              Título do Estudo <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="Ex: Epístola aos Gálatas: A Liberdade Cristã"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                  : 'border-stone-300 focus:border-amber-500 focus:ring-amber-400/20'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
              Descrição e Passagens Bíblicas
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Ler 1 capítulo por dia, anotar as dúvidas e analisar os versículos sobre a graça de Deus..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
            />
          </div>

          {/* Prazo */}
          <div>
            <label htmlFor="deadline" className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
              Prazo para Conclusão <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                  if (errors.deadline) setErrors((prev) => ({ ...prev, deadline: undefined }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 focus:outline-none focus:ring-2 transition-all ${
                  errors.deadline
                    ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-stone-300 focus:border-amber-500 focus:ring-amber-400/20'
                }`}
              />
            </div>
            {errors.deadline && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.deadline}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              Status do Estudo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {statusOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    status === opt.value
                      ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/30'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {opt.icon}
                    <span className="text-xs font-bold text-stone-800">{opt.label}</span>
                  </div>
                  <span className="text-[11px] text-stone-500 leading-tight">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-medium text-sm rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {initialObjective ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
