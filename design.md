# design.md — Sistema de Design do TarefaBoard

> Este arquivo define o sistema de design visual do TarefaBoard. Todos os componentes devem seguir estas diretrizes para garantir consistência visual. Em caso de conflito, `specs.md` tem precedência sobre este arquivo.

---

## 1. Paleta de Cores

### 1.1 Cores Principais

| Nome          | Hex       | Tailwind     | Uso                                              |
|---------------|-----------|--------------|--------------------------------------------------|
| Background    | `#0F172A` | `slate-900`  | Fundo principal da página                        |
| Surface       | `#1E293B` | `slate-800`  | Fundo de cards, modais, colunas                  |
| Border        | `#334155` | `slate-700`  | Bordas de inputs, cards, colunas                 |
| Primary       | `#6366F1` | `indigo-500` | Ações principais, botões, links, foco            |
| Primary Hover | `#4F46E5` | `indigo-600` | Hover em botões primários                        |
| Success       | `#22C55E` | `green-500`  | Coluna "Concluído", indicadores de sucesso       |
| Warning       | `#F59E0B` | `amber-500`  | Coluna "Em Progresso", indicadores de atenção    |
| Info          | `#3B82F6` | `blue-500`   | Coluna "A Fazer", indicadores informativos       |
| Danger        | `#EF4444` | `red-500`    | Ações destrutivas, botão "Excluir", erros        |
| Danger Hover  | `#DC2626` | `red-600`    | Hover em botões destrutivos                      |
| Text Primary  | `#F8FAFC` | `slate-50`   | Texto principal sobre fundo escuro               |
| Text Secondary| `#94A3B8` | `slate-400`  | Texto secundário, placeholders, labels           |
| Text Muted    | `#64748B` | `slate-500`  | Texto terciário, informações menos relevantes    |

### 1.2 Cores das Colunas Kanban

| Coluna          | Cor do cabeçalho | Tailwind            |
|-----------------|-------------------|---------------------|
| A Fazer         | Azul             | `bg-blue-500/20 text-blue-400 border-blue-500/30`   |
| Em Progresso    | Amarelo          | `bg-amber-500/20 text-amber-400 border-amber-500/30` |
| Concluído       | Verde            | `bg-green-500/20 text-green-400 border-green-500/30` |

### 1.3 Estados de Interação

| Estado     | Regra de cor                                     |
|------------|--------------------------------------------------|
| Hover      | Clarear 10% o background (usar opacidade Tailwind) |
| Focus      | Anel de foco `ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900` |
| Active     | Escurecer 10% o background                       |
| Disabled   | Opacidade 50% + cursor `not-allowed`             |
| Drag Over  | Background `indigo-500/10` com borda tracejada `indigo-500/40` |

---

## 2. Tipografia

### 2.1 Família de Fontes

| Categoria      | Stack                                      |
|----------------|--------------------------------------------|
| Títulos        | `'Inter', system-ui, -apple-system, sans-serif` |
| Corpo          | `'Inter', system-ui, -apple-system, sans-serif` |
| Monospace      | `'JetBrains Mono', 'Fira Code', monospace` |

A fonte **Inter** deve ser importada via Google Fonts no `index.html` com os pesos `400`, `500`, `600`, `700`.

### 2.2 Escala de Tamanhos

| Nome      | Tailwind Class | Tamanho | Uso                                     |
|-----------|----------------|---------|-----------------------------------------|
| xs        | `text-xs`      | 12px    | Labels, contadores, meta dados          |
| sm        | `text-sm`      | 14px    | Texto secundário, descrições            |
| base      | `text-base`    | 16px    | Corpo de texto padrão                   |
| lg        | `text-lg`      | 18px    | Títulos de cards                        |
| xl        | `text-xl`      | 20px    | Títulos de colunas                      |
| 2xl       | `text-2xl`     | 24px    | Título do modal                         |
| 3xl       | `text-3xl`     | 30px    | Logo / Título da página                 |

### 2.3 Pesos de Fonte

| Peso      | Tailwind     | Uso                                   |
|-----------|--------------|---------------------------------------|
| Regular   | `font-normal`| Texto de corpo e descrições           |
| Medium    | `font-medium`| Botões, chips de filtro, labels       |
| Semibold  | `font-semibold`| Títulos de cards e colunas         |
| Bold      | `font-bold`  | Títulos de página e modais            |

---

## 3. Espaçamento

### 3.1 Escala de Espaçamento (Tailwind)

| Token  | Valor | Uso                                              |
|--------|-------|--------------------------------------------------|
| `p-1`  | 4px   | Espaçamento interno mínimo (chips, badges)       |
| `p-2`  | 8px   | Padding interno de cards                         |
| `p-3`  | 12px  | Padding de botões pequenos                       |
| `p-4`  | 16px  | Padding padrão de cards, modais, inputs          |
| `p-6`  | 24px  | Padding de seções e cabeçalhos de coluna         |
| `p-8`  | 32px  | Padding do layout principal (board)              |
| `gap-3`| 12px  | Espaçamento entre cards na coluna                |
| `gap-4`| 16px  | Espaçamento entre colunas                        |
| `gap-6`| 24px  | Espaçamento entre seções principais              |

### 3.2 Layout Principal

```
┌─────────────────────────────────────────────────────────┐
│  Header (h-16, px-8, flex items-center)                 │
│  [Logo]                              [Nova Tarefa]      │
├─────────────────────────────────────────────────────────┤
│  Filtros (px-8, py-4)                                   │
│  [Buscar...]  [A Fazer] [Em Progresso] [Concluído]     │
├─────────────────────────────────────────────────────────┤
│  Board (flex-1, px-8, py-4, overflow-auto)              │
│  ┌──────────┐  ┌──────────────┐  ┌───────────┐        │
│  │ A Fazer  │  │ Em Progresso │  │ Concluído │        │
│  │ ┌──────┐ │  │ ┌──────────┐ │  │ ┌───────┐ │        │
│  │ │Card 1│ │  │ │ Card 2   │ │  │ │Card 3 │ │        │
│  │ └──────┘ │  │ └──────────┘ │  │ └───────┘ │        │
│  └──────────┘  └──────────────┘  └───────────┘        │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Componentes UI

### 4.1 Button

Variantes:

```tsx
// Primário — ação principal
<button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium
                   px-4 py-2 rounded-lg transition-colors duration-200
                   focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                   focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed">
  Criar
</button>

// Secundário — ação neutra
<button className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium
                   px-4 py-2 rounded-lg transition-colors duration-200
                   focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
                   focus:ring-offset-slate-900">
  Cancelar
</button>

// Destrutivo — ação de exclusão
<button className="bg-red-500 hover:bg-red-600 text-white font-medium
                   px-4 py-2 rounded-lg transition-colors duration-200
                   focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                   focus:ring-offset-slate-900">
  Excluir
</button>

// Ghost — ação sutil (ícones)
<button className="text-slate-400 hover:text-slate-200 p-1 rounded
                   transition-colors duration-200
                   focus:ring-2 focus:ring-indigo-500"
        aria-label="Editar tarefa">
  <Icon />
</button>
```

### 4.2 Input

```tsx
// Padrão
<input className="w-full bg-slate-800 border border-slate-700 rounded-lg
                  px-4 py-2 text-slate-50 placeholder:text-slate-500
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-colors duration-200" />

// Com erro
<input className="w-full bg-slate-800 border border-red-500 rounded-lg
                  px-4 py-2 text-slate-50 placeholder:text-slate-500
                  focus:ring-2 focus:ring-red-500 focus:border-red-500" />
```

### 4.3 Textarea

Mesmo estilo do Input, com altura mínima:

```tsx
<textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg
                     px-4 py-2 text-slate-50 placeholder:text-slate-500
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition-colors duration-200 min-h-[100px] resize-y" />
```

### 4.4 Modal

```tsx
// Overlay
<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50
                backdrop-blur-sm"
     role="dialog" aria-modal="true" aria-labelledby="modal-title">

  // Container
  <div className="bg-slate-800 border border-slate-700 rounded-xl w-full
                  max-w-md mx-4 shadow-2xl">
    // Header
    <div className="px-6 py-4 border-b border-slate-700">
      <h2 id="modal-title" className="text-2xl font-bold text-slate-50">
        Título do Modal
      </h2>
    </div>
    // Body
    <div className="px-6 py-4 space-y-4">
      {/* Conteúdo do formulário */}
    </div>
    // Footer
    <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
      {/* Botões de ação */}
    </div>
  </div>
</div>
```

### 4.5 TaskCard

```tsx
<div className="bg-slate-800 border border-slate-700 rounded-lg p-4
                hover:border-slate-600 transition-colors duration-200
                cursor-grab active:cursor-grabbing group"
     role="button" aria-roledescription="draggable">
  {/* Header do card */}
  <div className="flex items-start justify-between gap-2 mb-2">
    <h3 className="text-lg font-semibold text-slate-50 truncate">
      Título da tarefa
    </h3>
    <div className="flex gap-1 opacity-0 group-hover:opacity-100
                    transition-opacity duration-200">
      <button aria-label="Editar tarefa">...</button>
      <button aria-label="Excluir tarefa">...</button>
    </div>
  </div>
  {/* Descrição */}
  <p className="text-sm text-slate-400 line-clamp-3">
    Descrição da tarefa...
  </p>
  {/* Footer: data */}
  <p className="text-xs text-slate-500 mt-3">
    Criado em 15/01/2024
  </p>
</div>
```

### 4.6 Chip de Filtro

```tsx
// Ativo
<button className="px-3 py-1.5 rounded-full text-sm font-medium
                   bg-blue-500/20 text-blue-400 border border-blue-500/30
                   transition-colors duration-200">
  A Fazer
</button>

// Inativo
<button className="px-3 py-1.5 rounded-full text-sm font-medium
                   bg-slate-800 text-slate-400 border border-slate-700
                   hover:border-slate-600 hover:text-slate-300
                   transition-colors duration-200">
  A Fazer
</button>
```

### 4.7 Coluna Kanban

```tsx
<div className="flex flex-col bg-slate-800/50 border border-slate-700
                rounded-xl min-h-[300px]">
  {/* Cabeçalho */}
  <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
    <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
      A Fazer
    </h2>
    <span className="ml-auto text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
      3
    </span>
  </div>
  {/* Área de cards */}
  <div className="flex-1 p-3 space-y-3">
    {/* TaskCards */}
  </div>
</div>
```

---

## 5. Bordas e Sombras

### 5.1 Bordas

| Elemento       | Classes Tailwind                          |
|----------------|-------------------------------------------|
| Card           | `border border-slate-700 rounded-lg`      |
| Coluna         | `border border-slate-700 rounded-xl`      |
| Input/Textarea | `border border-slate-700 rounded-lg`      |
| Modal          | `border border-slate-700 rounded-xl`      |
| Chip           | `border rounded-full`                     |

### 5.2 Sombras

| Elemento  | Classes                     | Elevação |
|-----------|----------------------------|----------|
| Card      | `shadow-sm` (sutil)        | Baixa    |
| Modal     | `shadow-2xl`               | Alta     |
| Header    | `shadow-sm`                | Baixa    |

### 5.3 Arredondamento

| Tamanho  | Classe       | Uso                        |
|----------|--------------|----------------------------|
| Pequeno  | `rounded-md` | Chips, badges              |
| Padrão   | `rounded-lg` | Cards, inputs, botões      |
| Grande   | `rounded-xl` | Colunas, modais            |

---

## 6. Animações e Transições

### 6.1 Transições

Todas as transições de cor devem durar `200ms`:

```css
transition-colors duration-200
```

### 6.2 Opacidade e Visibilidade

- Botões de ação no card: escondidos por padrão (`opacity-0`), visíveis no hover do grupo (`group-hover:opacity-100`).
- Transição de opacidade: `transition-opacity duration-200`.

### 6.3 Drag and Drop

- Card sendo arrastado: `opacity-50 scale-95 rotate-1` com transição `transition-all duration-150`.
- Área de destino: `bg-indigo-500/10 border-2 border-dashed border-indigo-500/40`.

---

## 7. Ícones

### 7.1 Biblioteca

Usar **Lucide React** (`lucide-react`) para todos os ícones do projeto.

```bash
npm install lucide-react
```

### 7.2 Ícones por Contexto

| Contexto              | Ícone Lucide   | Tamanho |
|-----------------------|----------------|---------|
| Nova tarefa           | `Plus`         | 18px    |
| Editar tarefa         | `Pencil`       | 16px    |
| Excluir tarefa        | `Trash2`       | 16px    |
| Fechar modal          | `X`            | 20px    |
| Buscar                | `Search`       | 18px    |
| Logo/Board            | `LayoutDashboard` | 24px |
| A Fazer (coluna)       | `Circle`       | 10px    |
| Em Progresso (coluna) | `Circle`       | 10px    |
| Concluído (coluna)    | `CheckCircle2` | 10px    |

---

## 8. Responsividade

### 8.1 Breakpoints

| Nome    | Largura      | Classes Tailwind  |
|---------|--------------|-------------------|
| Mobile  | < 640px      | (padrão)          |
| Tablet  | 640–1024px   | `sm:`             |
| Desktop | ≥ 1024px     | `lg:`             |

### 8.2 Comportamento por Breakpoint

**Board (colunas)**:
- Mobile: `flex flex-col gap-4` (empilhado vertical)
- Tablet: `grid grid-cols-2 gap-4` (2 colunas)
- Desktop: `grid grid-cols-3 gap-6` (3 colunas)

**Modal**:
- Mobile: `max-w-md mx-4` (full-width com margem)
- Desktop: `max-w-lg` (largura fixa centralizada)

**Header**:
- Mobile: `px-4`
- Desktop: `px-8`

---

## 9. Acessibilidade Visual

- **Contraste mínimo**: Todos os textos devem ter contraste mínimo de 4.5:1 contra o fundo (WCAG AA).
- **Foco visível**: Todo elemento interativo deve ter `focus:ring-2` visível.
- **Labels**: Inputs devem sempre ter `<label>` associado via `htmlFor`/`id`.
- **Modal**: Deve usar `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- **Drag**: Usar `aria-roledescription="draggable"` nos cards.

---

## 10. Resumo de Tokens (Tailwind Config)

Para referência do agente de IA, estes são os tokens Tailwind recomendados para uso consistente em toda a aplicação:

- **Backgrounds**: `slate-900` (fundo), `slate-800` (superfície), `slate-800/50` (colunas)
- **Bordas**: `slate-700`
- **Textos**: `slate-50`, `slate-400`, `slate-500`
- **Ações primárias**: `indigo-500`, `indigo-600`
- **Ações destrutivas**: `red-500`, `red-600`
- **Status A Fazer**: `blue-500/20` bg, `blue-400` texto
- **Status Em Progresso**: `amber-500/20` bg, `amber-400` texto
- **Status Concluído**: `green-500/20` bg, `green-400` texto
- **Espaçamento**: `p-4`, `p-6`, `p-8`, `gap-3`, `gap-4`, `gap-6`
- **Arredondamento**: `rounded-lg` (cards/inputs), `rounded-xl` (colunas/modais), `rounded-full` (chips)
- **Fontes**: `text-xs` (meta), `text-sm` (secundário), `text-base` (corpo), `text-lg` (card título), `text-xl` (coluna título), `text-2xl` (modal título)
- **Pesos**: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
