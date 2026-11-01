import { StudyObjective, ObjectiveFormData } from '../types/objective';

const STORAGE_KEY = 'biblestudyflow_objectives';

const INITIAL_SAMPLE_OBJECTIVES: StudyObjective[] = [
  {
    id: 'sample-1',
    title: 'Epístola aos Romanos: Justificação pela Fé',
    description: 'Estudo indutivo dos capítulos 1 a 8 com foco na graça de Deus, justiça e vida no Espírito.',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: 'O Sermão do Monte (Mateus 5 a 7)',
    description: 'Analisar as Bem-Aventuranças e o caráter do Reino dos Céus aplicados à vida cristã prática.',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'nao_iniciado',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Salmos de Gratidão e Louvor',
    description: 'Leitura meditativa dos Salmos 100, 103 e 150 para enriquecer o momento de oração diária.',
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'concluido',
    createdAt: new Date().toISOString(),
  },
];

export const storageService = {
  /**
   * Retrieves all objectives from localStorage.
   * If first time running, initializes with inspiring initial samples.
   */
  getObjectives(): StudyObjective[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data === null) {
        // First visit initialization
        this.saveObjectives(INITIAL_SAMPLE_OBJECTIVES);
        return INITIAL_SAMPLE_OBJECTIVES;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Persists an array of objectives to localStorage.
   */
  saveObjectives(objectives: StudyObjective[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  /**
   * Creates and stores a new objective.
   */
  createObjective(formData: ObjectiveFormData): StudyObjective {
    const current = this.getObjectives();
    const newObjective: StudyObjective = {
      ...formData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newObjective, ...current];
    this.saveObjectives(updated);
    return newObjective;
  },

  /**
   * Updates an existing objective by ID.
   */
  updateObjective(id: string, formData: Partial<ObjectiveFormData>): StudyObjective | null {
    const current = this.getObjectives();
    const index = current.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updatedObjective: StudyObjective = {
      ...current[index],
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    current[index] = updatedObjective;
    this.saveObjectives(current);
    return updatedObjective;
  },

  /**
   * Removes an objective by ID.
   */
  deleteObjective(id: string): boolean {
    const current = this.getObjectives();
    const filtered = current.filter((item) => item.id !== id);
    if (filtered.length === current.length) return false;
    this.saveObjectives(filtered);
    return true;
  },

  /**
   * Resets with default examples if the user wants.
   */
  resetToSamples(): StudyObjective[] {
    this.saveObjectives(INITIAL_SAMPLE_OBJECTIVES);
    return INITIAL_SAMPLE_OBJECTIVES;
  },

  /**
   * Clears all stored items (leaves empty state).
   */
  clearAll(): void {
    this.saveObjectives([]);
  },
};
