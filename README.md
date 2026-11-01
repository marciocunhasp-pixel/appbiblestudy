# 📖 BibleStudyFlow

> **Organize seus objetivos de estudo bíblico cristão com constância, clareza e propósito.**

O **BibleStudyFlow** é uma aplicação web acolhedora e funcional desenvolvida especificamente para estudantes da Bíblia, devotos diários, alunos de seminário e líderes de pequenos grupos. A plataforma permite planejar metas de leitura bíblica e tópicos teológicos com prazos claros, acompanhamento visual de progresso e persistência de dados local sem necessidade de configuração de servidores.

---

## ✨ Funcionalidades Principais

* **🎯 Cadastro Completo de Objetivos**:
  * Registro de Título do estudo (ex.: *Epístola aos Gálatas: A Liberdade Cristã*).
  * Descrição detalhada para anotações, capítulos e passagens bíblicas centrais.
  * Prazo com seleção de data limite para conclusão.
  * Seleção de Status (*Não iniciado*, *Em andamento* ou *Concluído*).
* **⚡ Conclusão e Transição Rápida de Status**:
  * Alterne o status diretamente no cartão do objetivo ou marque como concluído em um único clique.
* **📅 Cálculo Inteligente de Prazos**:
  * Alertas visuais para objetivos atrasados (*Atrasado há X dias*).
  * Destaque para prazos urgentes (*Vence hoje!* ou *Vence em X dias*).
  * Formatação amigável de datas no padrão brasileiro (`dd/mm/aaaa`).
* **📊 Painel de Estatísticas e Progresso**:
  * Indicador da quantidade total de objetivos cadastrados no topo da página.
  * Contadores em tempo real para cada estado (*Não iniciados*, *Em andamento*, *Concluídos*).
  * Barra percentual de progresso geral dos estudos.
* **🔍 Busca, Filtros e Ordenação**:
  * Pesquisa textual instantânea por livros, temas ou passagens nas anotações.
  * Filtro rápido por status através dos cartões de métricas ou botões dedicados.
  * Ordenação dinâmica por prazo mais próximo, data de cadastro ou título alfabético.
* **🛡️ Exclusão Segura**:
  * Diálogo modal de confirmação obrigatório antes de remover qualquer item, prevenindo perdas acidentais.
* **💾 Persistência Offline-First (`localStorage`)**:
  * Todos os dados são salvos localmente no navegador via `storageService`.
  * As informações continuam salvas mesmo após fechar a aba ou recarregar a página (`F5`).
* **🕊️ Experiência Acolhedora**:
  * Telas de estado vazio (*empty states*) com versículos inspiradores (ex.: Provérbios 16:3).
  * Opção de carregar objetivos de exemplo pré-configurados para novos usuários.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Framework declarativo para construção de interfaces reativas |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipagem estrita e segurança em tempo de desenvolvimento |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Estilização utilitária moderna com paleta calorosa em tons de pedra e âmbar |
| **[Lucide React](https://lucide.dev/)** | Conjunto elegante e semântico de ícones |
| **[Vite](https://vite.dev/)** | Ferramenta de build e desenvolvimento ágil |
| **Web `localStorage` API** | Armazenamento de dados no cliente sem dependência de backend |

---

## 📁 Estrutura do Projeto

```text
/
├── AGENTS.md                  # Diretrizes e arquitetura para agentes de IA
├── SKILLS.md                  # Catálogo de competências operacionais e técnicas
├── README.md                  # Este documento de apresentação e documentação
├── index.html                 # Entrypoint da aplicação
├── package.json               # Dependências e scripts do projeto
├── tsconfig.json              # Configurações do compilador TypeScript
├── vite.config.ts             # Configuração do Vite e plugins
└── src/
    ├── main.tsx               # Ponto de entrada React (createRoot)
    ├── index.css              # Importação central do Tailwind CSS v4
    ├── App.tsx                # Componente orquestrador de estado e telas
    ├── types/
    │   └── objective.ts       # Contratos e tipos TypeScript (StudyObjective, StatusConfig)
    ├── services/
    │   └── storageService.ts  # Serviço isolado para operações no localStorage
    └── components/
        ├── Header.tsx         # Barra superior com logo, contador e botão de novo objetivo
        ├── StatsOverview.tsx  # Cards de métricas por status e barra de progresso
        ├── FilterBar.tsx      # Barra de pesquisa, ordenação e filtros rápidos
        ├── ObjectiveCard.tsx  # Cartão individual de exibição e ações do objetivo
        ├── ObjectiveFormModal.tsx # Modal de criação e edição com validações
        ├── DeleteConfirmModal.tsx # Modal de confirmação para exclusão segura
        └── EmptyState.tsx     # Estados vazios com versículos bíblicos e atalhos
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **npm**, **yarn** ou **bun**

### Instalação e Execução

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no seu navegador através do endereço exibido no terminal (geralmente `http://localhost:3000` ou `http://localhost:5173`).

3. **Verifique a integridade do código**:
   ```bash
   npm run lint
   ```

4. **Gere a build de produção**:
   ```bash
   npm run build
   ```

---

## 📋 Cenários de Validação (Testes)

| ID | Cenário | Ação Realizada | Resultado Esperado |
| :---: | :--- | :--- | :--- |
| **CT-01** | **Criação** | Preencher Título, Prazo e Status no modal e salvar. | Objetivo surge na lista e o contador é incrementado. |
| **CT-02** | **Validação** | Tentar salvar sem título ou sem data limite. | Mensagens de alerta amigáveis indicam os campos pendentes. |
| **CT-03** | **Edição** | Alterar o título ou status de um item existente. | Cartão reflete as alterações instantaneamente sem duplicar. |
| **CT-04** | **Exclusão** | Clicar na lixeira e confirmar no modal de diálogo. | O objetivo é removido permanentemente com aviso de sucesso. |
| **CT-05** | **Persistência** | Cadastrar novos objetivos e pressionar `F5`. | Todos os dados permanecem salvos e íntegros após o recarregamento. |
| **CT-06** | **Prazos** | Cadastrar itens com data passada, hoje ou futura. | Badges identificam visualmente atrasos, vencimentos de hoje ou dias restantes. |

---

## 📜 Versículo Inspirador

> *"Lâmpada para os meus pés é tua palavra e luz, para o meu caminho."*  
> — **Salmos 119:105**
