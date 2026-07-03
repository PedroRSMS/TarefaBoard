# TarefaBoard

Gerenciador de tarefas no estilo Kanban com colunas dinâmicas, etiquetas coloridas, datas de entrega e reordenação por drag & drop.

**Acesse o projeto:** https://pedrorsms.github.io/TarefaBoard/

---

## Sobre o Projeto

TarefaBoard é uma aplicação web single-page (SPA) para gerenciamento pessoal de tarefas no formato Kanban. Inspirada em ferramentas como Trello, permite criar, editar, excluir e organizar tarefas em colunas visuais que representam o status do trabalho.

### Diferenciais

- **Colunas dinâmicas** — criar, editar e excluir colunas com 8 cores diferentes (não limitado a 3 colunas fixas)
- **Drag & Drop híbrido** — suporte a mouse (PointerSensor) e toque (TouchSensor) para desktop e mobile
- **Reordenação intra-coluna** — cards podem ser reordenados dentro da mesma coluna, não apenas movidos entre colunas
- **Etiquetas coloridas** — 6 tags predefinidas (Bug, Feature, Melhoria, Urgente, Docs, Design) para categorização visual
- **Datas de entrega com indicador visual** — tarefas atrasadas ficam vermelhas, vencendo hoje ficam âmbar
- **Persistência offline-first** — dados salvos em `localStorage` com normalização automática de dados legados

---

## Features

| Feature | Descrição |
|---------|-----------|
| **CRUD de Tarefas** | Criar, editar (botão ou duplo-clique) e excluir com modais de confirmação |
| **Kanban Drag & Drop** | Arrastar cards entre colunas e reordenar dentro da mesma coluna |
| **Colunas Customizáveis** | CRUD completo de colunas com 8 cores e seletor visual |
| **Etiquetas Coloridas** | 6 tags com filtro dedicado por chip toggle |
| **Datas de Entrega** | Indicador visual overdue/today/upcoming com `date-fns` |
| **Filtro e Busca** | Busca textual com debounce 300ms + filtros por coluna e tag (AND lógico) |
| **Persistência Local** | `localStorage` com serialização JSON e tratamento de corrupção |

---

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 19 | UI framework com functional components e Context API |
| TypeScript | ~6.0 | Tipagem estática, zero `any` |
| Vite | 8.1 | Bundler com HMR e tree-shaking |
| Tailwind CSS | 3.4 | Estilização via classes utilitárias |
| @dnd-kit/core + sortable | 6.3 / 10.0 | Drag & drop acessível com sensores híbridos |
| date-fns | 4.4 | Manipulação e formatação de datas (pt-BR) |
| lucide-react | 1.23 | Ícones SVG tree-shakeable |
| uuid | 14.0 | Geração de IDs únicos |
| Vitest + Testing Library | 4.1 / 16.3 | Testes unitários e de integração |

---

## Como Executar

### Pré-requisitos

- Node.js 22+
- npm 10+

### Instalação

```bash
git clone https://github.com/PedroRSMS/TarefaBoard.git
cd TarefaBoard
npm install
npm run dev
```

Acesse: http://localhost:5173/TarefaBoard/

### Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o bundle de produção em `dist/` |
| `npm run preview` | Servidor local para preview do build |
| `npm run lint` | Executa o ESLint |
| `npm run typecheck` | Verifica a tipagem TypeScript |
| `npm run test` | Executa os testes (Vitest) |
| `npm run test:coverage` | Testes com relatório de cobertura |

---

## Estrutura de Componentes

```
src/
├── components/
│   ├── ui/                 # Componentes genéricos (Modal)
│   ├── board/              # Componentes do Kanban (Board, Column, TaskCard, TaskForm, ColumnForm, ...)
│   ├── filters/            # Filtros e busca (FiltersBar, SearchBar, StatusFilter, TagFilter)
│   └── TaskProvider.tsx    # Provider do Context (estado global)
├── hooks/                  # useLocalStorage, useTaskContext, useDebounce, taskReducer
├── types/                  # Interfaces e type aliases (Task, BoardColumn, TaskTag)
├── utils/                  # Funções puras (taskUtils, formatDate)
├── constants/             # Configurações (cores de coluna, tags, storage keys)
├── App.tsx
└── main.tsx
```

**Arquitetura de estado:** `useReducer` + Context API (sem Redux/Zustand), com dois reducers independentes (`taskReducer` e `columnReducer`) e persistência via hook `useLocalStorage`.

---

## Design

O sistema de design está documentado em [`design.md`](./design.md) e inclui:

- **Tema escuro** com paleta Slate + Indigo (WCAG AA)
- **Tipografia Inter** com escala de 12px a 30px
- **4 variantes de botão** (primário, secundário, destrutivo, ghost)
- **Responsividade** em 3 breakpoints (mobile empilhado, tablet 2 colunas, desktop 3+)
- **Acessibilidade** com ARIA labels, roles, navegação por teclado e contraste 4.5:1

---

## Arquivos de Orientação da IA

O desenvolvimento foi guiado por três arquivos de especificação:

| Arquivo | Função |
|---------|--------|
| [`specs.md`](./specs.md) | Especificações funcionais — features, modelo de dados, critérios de aceitação |
| [`design.md`](./design.md) | Sistema de design — cores, tipografia, componentes, responsividade |
| [`AGENTS.md`](./AGENTS.md) | Regras de comportamento do agente — convenções, proibições, testes, git |

Em caso de conflito, a prioridade é: `specs.md` > `design.md` > `AGENTS.md`.

---

## Testes e Qualidade

| Métrica | Valor |
|---------|-------|
| Testes | **109** (todos passando) |
| Cobertura de statements | **86.88%** |
| Arquivos de teste | **17** |
| Linhas de código | **3.202** |
| Commits | **16** (Conventional Commits) |

O pipeline de CI/CD (`.github/workflows/deploy.yml`) executa `typecheck`, `lint` e `test` antes de cada deploy. Qualquer falha bloqueia a publicação no GitHub Pages.

---

## Deploy

O deploy é **automático** via GitHub Actions a cada push na branch `main`.

**URL:** https://pedrorsms.github.io/TarefaBoard/