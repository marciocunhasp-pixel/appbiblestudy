export type ObjectiveStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface StudyObjective {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO date string YYYY-MM-DD
  status: ObjectiveStatus;
  createdAt: string;
  updatedAt?: string;
}

export type ObjectiveFormData = Omit<StudyObjective, 'id' | 'createdAt' | 'updatedAt'>;

export interface StatusConfig {
  label: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  iconName: string;
}

export const STATUS_CONFIG: Record<ObjectiveStatus, StatusConfig> = {
  nao_iniciado: {
    label: 'Não iniciado',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    borderClass: 'border-amber-200 dark:border-amber-800/40',
    iconName: 'Clock',
  },
  em_andamento: {
    label: 'Em andamento',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeText: 'text-blue-800 dark:text-blue-300',
    borderClass: 'border-blue-200 dark:border-blue-800/40',
    iconName: 'BookOpen',
  },
  concluido: {
    label: 'Concluído',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    borderClass: 'border-emerald-200 dark:border-emerald-800/40',
    iconName: 'CheckCircle2',
  },
};
