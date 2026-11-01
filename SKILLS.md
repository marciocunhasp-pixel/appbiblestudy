# SKILLS.md — Habilidades e Competências Técnicas do BibleStudyFlow

Este documento detalha o catálogo de habilidades (*skills*), procedimentos operacionais e competências de engenharia necessárias para que agentes de IA e desenvolvedores operem, testem e expandam com sucesso a aplicação **BibleStudyFlow**.

---

## 1. Visão Geral das Habilidades

O ecossistema do **BibleStudyFlow** é organizado em 6 competências nucleares:

```text
┌─────────────────────────────────────────────────────────────────┐
│                    BIBLESTUDYFLOW SKILLS                        │
├───────────────────┬──────────────────────┬──────────────────────┤
│ 1. Gestão de      │ 2. Persistência &    │ 3. Design Devocional │
│    Objetivos      │    Integridade       │    & Acessibilidade  │
├───────────────────┼──────────────────────┼──────────────────────┤
│ 4. Busca, Filtro  │ 5. Validação &       │ 6. Extensibilidade & │
│    & Ordenação    │    Garantia (QA)     │    Roadmap           │
└───────────────────┴──────────────────────┴──────────────────────┘
```

---

## 2. Catálogo Detalhado de Habilidades

### Skill 1: Gestão do Ciclo de Vida de Estudos Bíblicos (CRUD)
* **Objetivo**: Manipular com precisão a criação, edição, transição de status e exclusão de metas de estudo bíblico.
* **Procedimentos**:
  1. **Validação de Entrada**:
     * Garantir que `title` contenha ao menos 2 caracteres não vazios.
     * Garantir que `deadline` esteja no formato ISO `YYYY-MM-DD`.
     * Validar se o `status` pertence à união estrita: `'nao_iniciado' | 'em_andamento' | 'concluido'`.
  2. **Transições de Status**:
     * Permitir avanço rápido de `nao_iniciado` para `em_andamento` ao iniciar a leitura.
     * Permitir conclusão imediata com feedback tátil/visual e risco de tachado no título.
     * Permitir reabertura de estudo concluído sem perda do histórico de datas.
  3. **Cálculo Temporal de Prazos**:
     * Comparar a data limite contra o início do dia local (`00:00:00`).
     * `diffDays < 0`: Marcar como **Atrasado há X dias** com badge vermelho/rosa.
     * `diffDays === 0`: Marcar como **Vence hoje!** com badge âmbar de atenção.
     * `diffDays <= 3`: Marcar urgência moderada (**Vence em X dias**).
     * `diffDays > 3`: Exibir contagem regular de dias restantes.

---

### Skill 2: Persistência Local e Integridade de Dados (`storageService`)
* **Objetivo**: Gerenciar a persistência offline-first sem quebras de contrato ou perda de dados após recarregamento (`F5`).
* **Procedimentos**:
  1. **Chave de Armazenamento**: Operar sob a constante `'biblestudyflow_objectives'`.
  2. **Tratamento de Inicialização**:
     * Caso `localStorage.getItem` retorne `null`, popular automaticamente com os 3 estudos de exemplo iniciais (`sample-1`, `sample-2`, `sample-3`).
  3. **Geração Resiliente de IDs**:
     * Utilizar `crypto.randomUUID()` quando disponível no navegador.
     * Usar fallback baseado em timestamp e string pseudoaleatória quando em contextos sem suporte nativo.
  4. **Proteção contra Falhas de Parse**:
     * Envolver operações em blocos `try/catch` para capturar cotas excedidas ou JSON corrompido, retornando coleções seguras e emitindo logs descritivos.

---

### Skill 3: Design Devocional & Acessibilidade UI/UX
* **Objetivo**: Manter uma estética acolhedora, harmoniosa e livre de ruídos, condizente com momentos de reflexão e estudo bíblico.
* **Procedimentos**:
  1. **Diretrizes Visuais**:
     * **Cores**: Fundo em pedra/areia (`stone-50`, `stone-100`), acentos em âmbar bíblico (`amber-700`, `amber-800`), e status funcionais discretos (`emerald` para concluído, `blue` para em andamento).
     * **Tipografia**: Títulos e citações bíblicas em família serifada clássica (`font-serif`), corpo de texto e controles em sans-serif limpa e altamente legível.
  2. **Semântica e Acessibilidade**:
     * Modais com `role="dialog"`, `aria-modal="true"` e fechamento por botão explícito e backdrop.
     * Selects e botões de ação com atributos `aria-label` e `title` em português do Brasil.
  3. **Confirmação Obrigatória em Ações Destrutivas**:
     * Jamais excluir registros por cliques diretos. Sempre acionar `DeleteConfirmModal` contendo o nome do estudo entre aspas.
  4. **Empty States Educacionais**:
     * Manter versículos bíblicos de encorajamento (ex: Provérbios 16:3) e atalhos rápidos tanto para criação quanto para recarregamento de exemplos.

---

### Skill 4: Busca, Filtragem e Ordenação Reativa
* **Objetivo**: Permitir que o estudante localize passagens bíblicas, epístolas ou tópicos teológicos instantaneamente.
* **Procedimentos**:
  1. **Filtragem por Status**:
     * Suporte aos filtros: `todos`, `nao_iniciado`, `em_andamento`, `concluido`.
  2. **Busca Textual Flexível**:
     * Comparação *case-insensitive* e remoção de espaços em branco nas bordas (`.trim().toLowerCase()`).
     * Avaliar correspondência tanto no `title` quanto no campo `description` (onde ficam registradas as passagens bíblicas).
  3. **Ordenação Dinâmica**:
     * `deadline`: Ordena pelo prazo mais urgente/próximo.
     * `createdAt`: Mais recentes primeiro (ordem cronológica de cadastro).
     * `title`: Ordem alfabética de A a Z.

---

### Skill 5: Verificação, Qualidade e Testes (QA)
* **Objetivo**: Garantir que novas alterações não quebrem o build do Vite ou a compilação do TypeScript.
* **Roteiro de Validação**:
  1. Executar verificação de tipos:
     ```bash
     npx tsc --noEmit
     ```
  2. Validar cenários de teste essenciais:
     * **CT-01**: Criar novo objetivo e verificar se surge na listagem e no contador do cabeçalho.
     * **CT-02**: Tentar submeter formulário sem título e sem data para atestar feedback de erro visual.
     * **CT-03**: Editar título e descrição, salvar e validar persistência na interface.
     * **CT-04**: Tentar exclusão e certificar-se de que o modal de confirmação é exibido antes da remoção.
     * **CT-05**: Pressionar `F5` / recarregar a página e constatar manutenção total do estado no `localStorage`.
     * **CT-06**: Alternar filtros e termos de busca verificando os estados de lista vazia correspondentes.

---

### Skill 6: Extensibilidade e Habilidades Futuras (Roadmap)
* **Objetivo**: Padronizar as diretrizes para implementar as próximas evoluções da aplicação.
* **Capacidades Futuras Planejadas**:
  1. **Skill de Categorização Teológica**:
     * Adicionar tags temáticas (`Antigo Testamento`, `Novo Testamento`, `Teologia Sistemática`, `Devocional`, `Hermenêutica`).
  2. **Skill de Checklist de Capítulos**:
     * Adicionar subtarefas aos objetivos (ex: *Capítulo 1*, *Capítulo 2*, *Capítulo 3* com progresso percentual derivado).
  3. **Skill de Backup e Exportação**:
     * Exportar e importar coleção completa de objetivos em arquivo `.json`.
  4. **Skill de Consulta Bíblica Direta**:
     * Integração com APIs bíblicas públicas para exibição de versículos com base nas referências descritas.
  5. **Skill de Sincronização em Nuvem**:
     * Evolução para Firebase Firestore / Auth caso o usuário solicite sincronização entre múltiplos dispositivos.

---

## 3. Resumo de Comandos Úteis para o Agente

| Ação | Ferramenta / Comando |
| :--- | :--- |
| **Checar tipagem estrita** | `tsc --noEmit` / `lint_applet` |
| **Compilar projeto** | `compile_applet` |
| **Modificar código** | `replace_file_content` ou `write_to_file` |
| **Persistência de teste** | Inspecionar ou limpar `localStorage.getItem('biblestudyflow_objectives')` |
