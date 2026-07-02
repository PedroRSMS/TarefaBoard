# AGENTS.md — Regras de Comportamento do Agente

Este arquivo define as regras, convenções e procedimentos que um agente de IA deve seguir ao implementar o projeto **TarefaBoard**.

---

## 1. Visão Geral do Projeto

TarefaBoard é um gerenciador de tarefas no estilo Kanban, desenvolvido como frontend puro (sem backend), utilizando React com TypeScript e Tailwind CSS.

---

## 2. Fluxo de Desenvolvimento

### 2.1 Comandos disponíveis

| Comando               | Descrição                                   |
|-----------------------|---------------------------------------------|
| `npm run dev`         | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build`       | Gera o bundle de produção                   |
| `npm run lint`        | Executa o linter (ESLint)                   |
| `npm run typecheck`   | Verifica a tipagem TypeScript               |
| `npm run test`        | Executa os testes (Vitest)                  |
| `npm run test:coverage` | Executa testes com cobertura             |

### 2.2 Ordem de implementação

O agente deve seguir rigorosamente a ordem definida em `specs.md`:

1. **Setup do projeto** — Vite + React + TypeScript + Tailwind + bibliotecas
2. **Feature 1: CRUD de Tarefas** — Estrutura base, tipagem, estado
3. **Feature 2: Kanban Drag & Drop** — Colunas e movimentação de cards
4. **Feature 4: Persistência Local** — Salvamento em localStorage
5. **Feature 3: Filtro e Busca** — Filtros por status e busca textual

### 2.3 Após cada feature

- Executar `npm run lint` e corrigir todos os warnings/erros
- Executar `npm run typecheck` e garantir que não há erros de tipo
- Executar `npm run test` e garantir que todos os testes passam
- Fazer um commit com mensagem no formato: `feat: descrição da feature`

---

## 3. Convenções de Código

### 3.1 TypeScript

- **Sempre** utilizar tipagem explícita em parâmetros de função e retornos
- **Proibido** o uso do tipo `any`
- Interfaces e tipos devem ser definidos em `src/types/`
- Preferir `interface` sobre `type` para objetos, exceto quando usar unions ou intersections complexas
- Usar `readonly` em propriedades de interface que não devem ser mutadas

### 3.2 React

- **Todos** os componentes devem ser funções (functional components)
- **Proibido** o uso de class components
- Hooks customizados devem começar com `use` (ex: `useTasks`, `useLocalStorage`)
- Um componente por arquivo
- Props devem ser tipadas via interface explícita no mesmo arquivo ou importada de `src/types/`
- Evitar mais de 3 níveis de `useState`/`useEffect` em um mesmo componente — extrair para hook customizado

### 3.3 Estrutura de Pastas

```
src/
├── components/
│   ├── ui/              # Componentes genéricos (Button, Input, Modal)
│   ├── board/           # Componentes do Kanban (Board, Column, TaskCard)
│   └── filters/         # Componentes de filtro e busca
├── hooks/               # Hooks customizados
├── types/               # Interfaces e tipos TypeScript
├── utils/               # Funções utilitárias puras
├── constants/           # Constantes (status labels, cores)
├── App.tsx
└── main.tsx
```

### 3.4 Nomenclatura

- **Arquivos**: PascalCase para componentes (`TaskCard.tsx`), camelCase para hooks (`useTasks.ts`), camelCase para utilitários (`storage.ts`)
- **Componentes**: sempre com nome explícito (`export function TaskCard`), nunca `export default`
- **Funções**: verbos no infinitivo (`handleCreate`, `onDragEnd`)
- **Constantes**: UPPER_SNAKE_CASE para valores fixos globais

### 3.5 Estilização

- Usar exclusivamente classes utilitárias do Tailwind CSS
- **Proibido** escrever CSS customizado em arquivos `.css`
- **Proibido** usar inline styles (objeto `style`)
- Para classes Tailwind muito longas (mais de 8 classes), considerar extrair para um componente
- Seguir a escala de cores e espaçamento definida em `design.md`

---

## 4. Gerenciamento de Estado

- Estado global das tarefas: `useReducer` + Context API
- Estado local de UI (modais abertos, inputs): `useState`
- Persistência: hook customizado `useLocalStorage` que sincroniza com `localStorage`
- **Proibido** usar Redux, Zustand ou outras bibliotecas de estado externas

---

## 5. Testes

### 5.1 Framework

- **Vitest** como test runner
- **React Testing Library** para testes de componente
- **jsdom** como ambiente

### 5.2 O que testar

- Testes unitários para funções utilitárias e hooks
- Testes de integração para componentes principais (Board, TaskCard, TaskForm)
- Cobertura mínima aceitável: **80%**

### 5.3 Convenções de teste

- Arquivos de teste ao lado do componente: `TaskCard.test.tsx`
- Nomes descritivos em português: `it('deve renderizar o título da tarefa')`
- Testar comportamentos, não implementação interna

---

## 6. Git e Commits

### 6.1 Formato de commit

Seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona criação de tarefas com modal
fix: corrige drag and drop no firefox
refactor: extrai lógica de persistência para hook
chore: atualiza dependências
```

### 6.2 O que NÃO fazer

- **Nunca** commitar `node_modules/`
- **Nunca** commitar arquivos `.env` com valores reais
- **Nunca** fazer push direto na `main` — usar branches de feature
- **Nunca** commitar código com erros de lint ou typecheck

---

## 7. Restrições e Proibições

| Categoria          | Proibido                                | Alternativa                            |
|--------------------|-----------------------------------------|----------------------------------------|
| React              | Class components                        | Functional components                  |
| TypeScript         | Tipo `any`                              | Tipagem explícita ou `unknown`         |
| Estilização        | CSS customizado, inline styles          | Tailwind CSS                           |
| Estado             | Redux, Zustand, MobX                    | Context API + useReducer               |
| Exportações        | `export default`                        | `export` nomeado                       |
| Bibliotecas        | Adicionar lib sem estar em specs.md     | Consultar specs.md antes de adicionar  |
| Backend            | Qualquer chamada a API externa          | Usar localStorage como persistência    |
| Acessibilidade     | Ignorar atributos ARIA                  | Incluir aria-label, role, etc.        |

---

## 8. Referências

O agente deve consultar os seguintes arquivos antes de iniciar qualquer feature:

1. **`specs.md`** — Funcionalidades detalhadas e prioridades
2. **`design.md`** — Sistema de design, cores e componentes

Em caso de conflito entre os arquivos, a prioridade é: `specs.md` > `design.md` > `AGENTS.md`.
