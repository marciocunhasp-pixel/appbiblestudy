# AGENTS.md — BibleStudyFlow

Este documento serve como guia de arquitetura, padrões e instruções para agentes de inteligência artificial e desenvolvedores que mantêm, evoluem ou interagem com o código da aplicação **BibleStudyFlow**.

---

## 1. Visão Geral do Produto

**BibleStudyFlow** é uma aplicação web educacional e devocional desenvolvida para estudantes cristãos organizarem, acompanharem e atingirem objetivos de estudo bíblico com constância, clareza e propósito.

### Público-Alvo
* Estudantes da Bíblia e devotos diários.
* Alunos de seminários, institutos bíblicos e Escola Bíblica Dominical (EBD).
* Líderes de células/pequenos grupos preparando mensagens e estudos temáticos.

### Princípios de Design & Tom
* **Acolhedor e reflexivo**: Tons quentes de pergaminho/pedra (`stone-50`, `stone-100`), âmbar (`amber-700`) e tipografia serifada para títulos.
* **Sem fricção**: Criação e atualização de objetivos em poucos cliques, com feedback imediato.
* **100% em Português do Brasil**: Labels, mensagens de erro, alertas e estados vazios sempre em pt-BR.

---

## 2. Pilha Tecnológica (Tech Stack)

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Linguagem** | TypeScript 5+ | Tipagem estrita, interfaces isoladas em `/src/types` |
| **Framework UI** | React 19 (SPA) | Abordagem funcional com React Hooks (`useState`, `useEffect`, `useMemo`) |
| **Estilização** | Tailwind CSS v4 | Utilitários diretos, sem folhas CSS paralelas |
| **Ícones** | Lucide React | `BookOpen`, `Calendar`, `Clock`, `CheckCircle2`, `Trash2`, `Edit2`, etc. |
| **Build & Dev** | Vite | Bundler rápido com servidor de desenvolvimento local |
| **Persistência** | Web `localStorage` | Offline-first, desacoplado via serviço em `/src/services` |

---

## 3. Estrutura de Arquivos

```text
/
├── index.html                     # Entry point HTML com metatags semânticas e fontes
├── metadata.json                  # Metadados da aplicação no AI Studio
├── package.json                   # Dependências e scripts (dev, build, lint)
├── tsconfig.json                  # Configurações do compilador TypeScript
├── vite.config.ts                 # Configuração do Vite e Tailwind
├── AGENTS.md                      # Este guia para agentes e desenvolvedores
└── src/
    ├── main.tsx                   # Inicialização do React (createRoot)
    ├── index.css                  # Diretiva principal Tailwind (@import "tailwindcss";)
    ├── App.tsx                    # Orquestrador central de estado, filtros e telas
    ├── types/
    │   └── objective.ts           # Definições de tipos, contratos e configurações de status
    ├── services/
    │   └── storageService.ts      # Serviço isolado de persistência no localStorage
    └── components/
        ├── Header.tsx             # Barra superior, logotipo e contador global
        ├── StatsOverview.tsx      # Cards de métricas por status e barra de progresso
        ├── FilterBar.tsx          # Barra de busca por texto, filtro de status e ordenação
        ├── ObjectiveCard.tsx      # Cartão do objetivo (prazos inteligentes, ações rápidas)
        ├── ObjectiveFormModal.tsx # Modal de criação e edição com validação
        ├── DeleteConfirmModal.tsx # Modal acessível de confirmação obrigatória de exclusão
        └── EmptyState.tsx         # Telas de estado vazio com versículo e chamada para ação
```

---

## 4. Modelo de Dados (`src/types/objective.ts`)

```typescript
export type ObjectiveStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface StudyObjective {
  id: string;             // Identificador único (UUID ou fallback gerado)
  title: string;          // Título do objetivo (ex: "Epístola aos Gálatas")
  description: string;    // Passagens centrais, anotações e escopo
  deadline: string;       // Formato ISO: YYYY-MM-DD
  status: ObjectiveStatus;// Estado atual do objetivo
  createdAt: string;      // Timestamp ISO de criação
  updatedAt?: string;     // Timestamp ISO da última alteração
}

export type ObjectiveFormData = Omit<StudyObjective, 'id' | 'createdAt' | 'updatedAt'>;
```

---

## 5. Arquitetura de Persistência (`src/services/storageService.ts`)

A persistência do MVP opera em `localStorage` sob a chave `biblestudyflow_objectives`.

### Métodos Disponíveis
* `getObjectives(): StudyObjective[]`: Lê os registros salvos ou popula com exemplos iniciais na primeira visita.
* `saveObjectives(objectives: StudyObjective[]): void`: Sobrescreve o payload serializado em JSON.
* `createObjective(data: ObjectiveFormData): StudyObjective`: Gera ID único e salva novo registro.
* `updateObjective(id: string, data: Partial<ObjectiveFormData>): StudyObjective | null`: Atualiza campos específicos e carimba `updatedAt`.
* `deleteObjective(id: string): boolean`: Remove o objetivo pelo ID.
* `resetToSamples(): StudyObjective[]`: Recarrega objetivos de exemplo devocionais.
* `clearAll(): void`: Limpa todos os dados armazenados.

---

## 6. Regras e Convenções para Agentes

Ao efetuar alterações neste projeto, qualquer agente deve aderir às seguintes regras:

1. **Confirmação Obrigatória na Exclusão**:
   * Nunca exclua um objetivo diretamente sem abrir o `DeleteConfirmModal`.
   * O modal deve exibir explicitamente o título do item prestes a ser removido.

2. **Cálculo e Exibição de Prazos**:
   * Prazos vencidos devem ser destacados com alertas visuais amigáveis (ex: cor vermelha/rosa e texto "Atrasado há X dias").
   * Prazos para o próprio dia devem exibir "Vence hoje!".
   * Formatação de datas sempre no padrão brasileiro (`dd/mm/aaaa` ou `15 de nov. de 2026`).

3. **Independência de Backend nesta Fase**:
   * A primeira versão é puramente client-side. Não adicione rotas express ou APIs sem solicitação expressa do usuário.
   * Não utilizar `window.alert` ou `window.confirm`; utilize modais React integrados ao design system.

4. **Preservação de Responsividade**:
   * Todos os grids e formulários devem funcionar confortavelmente a partir de 320px de largura de tela até monitores ultrawide.

5. **Verificação de Compilação**:
   * Sempre execute `compile_applet` e/ou `lint_applet` após introduzir edições de código para garantir integridade do TypeScript.

---

## 7. Roadmap para Versões Futuras

Quando solicitado pelo usuário para evoluir a aplicação além da V1:

* [ ] **Filtro por Categoria / Livro Bíblico**: Adicionar tags (ex: Antigo Testamento, Novo Testamento, Teologia, Oração).
* [ ] **Subtarefas e Capítulos**: Checklist de capítulos lidos dentro de um mesmo objetivo (ex: Gálatas 1, 2, 3...).
* [ ] **Integração com Textos Bíblicos**: Consulta a versículos da Bíblia diretamente na interface.
* [ ] **Exportação e Backup**: Baixar e restaurar objetivos em formato JSON.
* [ ] **Sincronização em Nuvem**: Autenticação e banco de dados via Firebase Firestore para múltiplos dispositivos.
