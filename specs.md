# specs.md — Especificações Funcionais do TarefaBoard

> **Prioridade de leitura**: Em caso de conflito com outros arquivos de especificação, este arquivo tem precedência sobre `design.md` e `AGENTS.md`.

---

## 1. Definição do Projeto

**TarefaBoard** é um gerenciador de tarefas no estilo Kanban. O usuário pode criar, editar, excluir e organizar tarefas em colunas visuais que representam o status do trabalho. Toda a persistência é feita via `localStorage`, sem backend.

### 1.1 Objetivo

Prover uma interface simples e intuitiva para gerenciamento de tarefas pessoais, inspirada em ferramentas como Trello, porém simplificada para uso individual.

### 1.2 Público-alvo

Usuário único (não há sistema de login, times ou compartilhamento).

---

## 2. Stack Tecnológica

| Camada            | Tecnologia                          | Versão         |
|-------------------|--------------------------------------|----------------|
| Bundler           | Vite                                 | ^5.0           |
| UI Framework      | React                                | ^18.2          |
| Linguagem         | TypeScript                           | ^5.3           |
| Estilização       | Tailwind CSS                         | ^3.4           |
| Drag and Drop     | @dnd-kit/core + @dnd-kit/sortable    | ^6.1           |
| IDs               | uuid                                 | ^9.0           |
| Datas             | date-fns                             | ^3.3           |
| Ícones            | lucide-react                         | ^0.309         |
| Testes            | Vitest + @testing-library/react      | ^1.2 / ^14.1   |
| Linting           | ESLint + eslint-plugin-react-hooks    | ^8.56          |

### 2.1 Por que @dnd-kit?

- API declarativa compatível com React moderno
- Suporte nativo a acessibilidade (teclado + screen readers)
- Leve (~10 KB gzipped)
- Mantido ativamente pela comunidade

### 2.2 Por que date-fns?

- Tree-shakeable (importa apenas o que usa)
- Sem mutação de objetos Date
- Suporte a internacionalização (formatação em pt-BR)

### 2.3 Por que lucide-react?

- Biblioteca de ícones lightweight e tree-shakeable
- Ícones SVG puros (sem dependência de fontes externas)
- API declarativa via componentes React
- Estilo consistente com o design do projeto

---

## 3. Modelo de Dados

### 3.1 Interface `Task`

```typescript
interface Task {
  readonly id: string;         // UUID v4 gerado via uuid()
  title: string;               // Máximo 120 caracteres
  description: string;         // Máximo 500 caracteres
  status: TaskStatus;          // Status atual da tarefa
  readonly createdAt: string;  // ISO 8601 (ex: "2024-01-15T10:30:00.000Z")
  updatedAt: string;           // ISO 8601, atualizado a cada modificação
}
```

### 3.2 Tipo `TaskStatus`

```typescript
type TaskStatus = 'todo' | 'in-progress' | 'done';
```

| Status          | Label         | Coluna Kanban      |
|-----------------|---------------|--------------------|
| `todo`          | A Fazer       | Coluna 1           |
| `in-progress`   | Em Progresso  | Coluna 2           |
| `done`          | Concluído     | Coluna 3           |

### 3.3 Regras de validação

| Campo         | Regra                                    | Mensagem de erro                          |
|---------------|------------------------------------------|-------------------------------------------|
| `title`       | Obrigatório, 1 a 120 caracteres          | "O título é obrigatório (máx. 120 caracteres)" |
| `description` | Opcional, 0 a 500 caracteres             | "A descrição deve ter no máximo 500 caracteres" |
| `status`      | Deve ser um dos 3 valores do TaskStatus  | — (validado pelo TypeScript)              |

---

## 4. Features

### Feature 1: CRUD de Tarefas — Prioridade ALTA

**Ordem de implementação**: 1ª (requerida pelas demais features).

#### 4.1.1 Criar Tarefa

- **Gatilho**: Botão "Nova Tarefa" fixo no header da aplicação.
- **Interface**: Modal com formulário contendo:
  - Campo `título` (input text, obrigatório).
  - Campo `descrição` (textarea, opcional).
  - Botão "Criar" (desabilitado se título vazio ou inválido).
  - Botão "Cancelar" (fecha o modal sem salvar).
- **Comportamento**:
  - Ao clicar "Criar", a tarefa é adicionada ao estado global com `status: 'todo'`.
  - O modal fecha automaticamente.
  - O foco retorna ao botão "Nova Tarefa".
- **Validação**: Feedback visual em tempo real (borda vermelha + mensagem abaixo do campo).

#### 4.1.2 Editar Tarefa

- **Gatilho**: Botão de editar (ícone lápis) no card da tarefa ou duplo-clique no card.
- **Interface**: Modal com formulário pré-preenchido com os dados atuais.
  - Campo `título` (preenchido).
  - Campo `descrição` (preenchido).
  - Select/radio para `status` da tarefa.
  - Botão "Salvar" (desabilitado se título vazio ou inválido).
  - Botão "Cancelar".
- **Comportamento**:
  - Ao salvar, a tarefa é atualizada no estado global.
  - O campo `updatedAt` é atualizado para a data/hora atual.
  - O modal fecha automaticamente.

#### 4.1.3 Excluir Tarefa

- **Gatilho**: Botão de excluir (ícone lixeira) no card da tarefa.
- **Interface**: Modal de confirmação com:
  - Texto: "Tem certeza que deseja excluir a tarefa '[título]'?"
  - Botão "Excluir" (destrutivo, vermelho).
  - Botão "Cancelar".
- **Comportamento**:
  - Ao confirmar, a tarefa é removida do estado global.
  - O modal fecha automaticamente.

#### 4.1.4 Estados e Edge Cases

| Estado / Caso               | Comportamento esperado                                   |
|-----------------------------|----------------------------------------------------------|
| Título vazio ao criar       | Botão "Criar" desabilitado, mensagem de erro visível     |
| Título vazio ao editar      | Botão "Salvar" desabilitado, mensagem de erro visível    |
| Lista de tarefas vazia      | Mensagem "Nenhuma tarefa encontrada" no board            |
| Múltiplos cliques no criar  | Botão desabilitado durante o processamento               |
| Dados inválidos no storage  | Inicializa com array vazio e loga warning no console     |

---

### Feature 2: Kanban Drag & Drop — Prioridade ALTA

**Ordem de implementação**: 2ª (depende da Feature 1 para ter tarefas no estado).

#### 4.2.1 Layout do Board

- **3 colunas lado a lado** em desktop (grid de 3 colunas).
- **Empilhamento vertical** em mobile (colunas uma abaixo da outra).
- Cada coluna tem:
  - Cabeçalho com nome do status e contador de tarefas.
  - Área droppable onde os cards são renderizados.

#### 4.2.2 Comportamento do Drag

- **Drag do card**: O usuário pode arrastar um card de uma coluna para outra.
- **Feedback visual durante drag**:
  - Card original fica com opacidade reduzida (50%).
  - Placeholder fantasma na posição de destino.
  - Cursor `grabbing`.
- **Ao soltar (onDragEnd)**:
  - Se o card foi solto em uma coluna diferente, o `status` da tarefa é atualizado.
  - O campo `updatedAt` é atualizado.
  - Se solto na mesma coluna, nada acontece.
  - Se solto fora de qualquer coluna, o card retorna à posição original.

#### 4.2.3 Acessibilidade no Drag and Drop

- Cards devem ser focáveis via teclado (`tabIndex={0}`).
- Tecla `Space` ou `Enter` inicia o drag.
- Teclas de seta movem o card entre colunas.
- Atributos `aria-roledescription="draggable"` e `aria-describedby` nos cards.

#### 4.2.4 Edge Cases

| Caso                          | Comportamento                                    |
|-------------------------------|--------------------------------------------------|
| Coluna de destino vazia       | Card é adicionado normalmente                    |
| Drag durante animação         | Animação é cancelada, inicia novo drag           |
| Tela touch (mobile)           | Usar sensor `touch` do @dnd-kit                  |
| Browser sem suporte a pointer | Fallback para mouse events via @dnd-kit          |

---

### Feature 3: Filtro e Busca — Prioridade MÉDIA

**Ordem de implementação**: 5ª (após Feature 4, para persistir preferências de filtro).

#### 4.3.1 Componentes de Filtro

- **Barra de busca textual**:
  - Input com placeholder "Buscar tarefas..." no topo do board.
  - Busca em tempo real (sem necessidade de apertar Enter).
  - Busca apenas no campo `title` das tarefas.
  - Case-insensitive.
  - Debounce de 300ms para evitar renderizações excessivas.

- **Filtro por status**:
  - Botões toggle (estilo chips) para cada status.
  - Comportamento: múltiplos status podem ser selecionados simultaneamente.
  - Label: "A Fazer", "Em Progresso", "Concluído".
  - Estado visual: ativo (preenchido) / inativo (outline).
  - Padrão inicial: todos selecionados.

#### 4.3.2 Comportamento Combinado

- Filtro de status + busca textual são aplicados simultaneamente (AND lógico).
- Sempre que os filtros são alterados, a exibição do board é atualizada.
- Colunas que ficarem vazias após o filtro exibem "Nenhuma tarefa neste status".

#### 4.3.3 Edge Cases

| Caso                                | Comportamento                                       |
|-------------------------------------|-----------------------------------------------------|
| Nenhum resultado                    | Mensagem: "Nenhuma tarefa encontrada para os filtros atuais" |
| Busca com termo muito curto (1 char)| Busca normalmente (não há mínimo de caracteres)     |
| Caracteres especiais na busca       | Escapados automaticamente (tratados como literal)   |
| Todos os filtros de status desmarcados | Mostrar mensagem "Selecione ao menos um status"  |

---

### Feature 4: Persistência Local — Prioridade MÉDIA

**Ordem de implementação**: 4ª (antes do Filtro e Busca, pois é infraestrutura base).

#### 4.4.1 Hook useLocalStorage

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```

- Lê do `localStorage` na montagem do componente.
- Se a chave não existe, inicializa com `initialValue`.
- Se o JSON estiver corrompido, loga warning e inicializa com `initialValue`.
- Persiste no `localStorage` sempre que o valor é atualizado.
- Usa `JSON.stringify` / `JSON.parse`.

#### 4.4.2 Chave de Armazenamento

- Chave: `"tarefa-board-tasks"`
- Valor: Array serializado de `Task[]`.

#### 4.4.3 Sincronização com Estado

- O hook `useTasks` (gerenciador de estado via `useReducer`) utiliza `useLocalStorage` como fonte de persistência.
- O estado é inicializado a partir do `localStorage`.
- Cada dispatch do reducer dispara a persistência no `localStorage`.

#### 4.4.4 Edge Cases

| Caso                              | Comportamento                                      |
|-----------------------------------|----------------------------------------------------|
| localStorage cheio (quota)        | Exibe toast/alert avisando e mantém em memória     |
| localStorage não disponível       | Opera apenas em memória (modo degradado)           |
| JSON malformado no storage        | Reseta para array vazio com warning no console     |
| Abas duplicadas                   | A última aba a salvar sobrescreve (sem conflito)   |

---

## 5. Fluxo de Navegação

```
App
 └── Board (página única)
      ├── Header
      │    ├── Logo "TarefaBoard"
      │    └── Botão "Nova Tarefa"
      ├── Filtros (Feature 3)
      │    ├── Barra de busca
      │    └── Chips de filtro por status
      ├── Colunas Kanban (Feature 2)
      │    ├── Coluna "A Fazer"
      │    │    └── TaskCard(s)
      │    ├── Coluna "Em Progresso"
      │    │    └── TaskCard(s)
      │    └── Coluna "Concluído"
      │         └── TaskCard(s)
      └── Modais (Feature 1)
           ├── Modal de criação de tarefa
           ├── Modal de edição de tarefa
           └── Modal de confirmação de exclusão
```

A aplicação é uma **Single Page Application (SPA)** com uma única rota (`/`).

---

## 6. Responsividade

| Breakpoint | Largura    | Comportamento                              |
|------------|------------|--------------------------------------------|
| Mobile     | < 640px    | Colunas empilhadas verticalmente            |
| Tablet     | 640–1024px | 2 colunas por linha (a 3ª abaixo)          |
| Desktop    | ≥ 1024px   | 3 colunas lado a lado                      |

---

## 7. Critérios de Aceitação (Checklist Final)

- [ ] Usuário pode criar, editar e excluir tarefas
- [ ] Usuário pode mover tarefas entre colunas via drag and drop
- [ ] Tarefas persistem ao recarregar a página (localStorage)
- [ ] Usuário pode filtrar tarefas por status e buscar por texto
- [ ] Interface é responsiva (mobile, tablet, desktop)
- [ ] Nenhum erro de TypeScript (`npm run typecheck`)
- [ ] Nenhum warning/erro de lint (`npm run lint`)
- [ ] Cobertura de testes ≥ 80% (`npm run test:coverage`)
- [ ] Atributos de acessibilidade presentes em todos os componentes interativos

---

## 8. Possíveis Extensões Futuras

Estas funcionalidades **não** devem ser implementadas nesta versão. Estão listadas apenas para conhecimento e para que a arquitetura atual não impossibilite sua adição futura.

- **Etiquetas/Tags**: Tarefas podem ter tags coloridas para categorização
- **Data de vencimento**: Tarefas com prazo e indicador visual de atraso
- **Reordenação intra-coluna**: Ordenar cards dentro da mesma coluna
- **Modo escuro**: Toggle entre tema claro e escuro
- **Exportação CSV/JSON**: Botão para exportar tarefas
- **Múltiplos boards**: Alternar entre diferentes conjuntos de tarefas
- **Animações de transição**: Animações suaves ao criar/excluir/mover cards
