import type { BoardColumn, ColumnColor } from '../types'
import { v4 as uuid } from 'uuid'

export const COLUMN_COLOR_DOT: Record<ColumnColor, string> = {
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  cyan: 'bg-cyan-500',
  orange: 'bg-orange-500',
}

export const COLUMN_COLOR_CHIP: Record<ColumnColor, string> = {
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

export const COLUMN_COLOR_LABELS: Record<ColumnColor, string> = {
  blue: 'Azul',
  amber: 'Ambar',
  green: 'Verde',
  red: 'Vermelho',
  purple: 'Roxo',
  pink: 'Rosa',
  cyan: 'Ciano',
  orange: 'Laranja',
}

export function getDefaultColumns(): BoardColumn[] {
  return [
    { id: 'col-todo', title: 'A Fazer', color: 'blue' },
    { id: 'col-in-progress', title: 'Em Progresso', color: 'amber' },
    { id: 'col-done', title: 'Concluido', color: 'green' },
  ]
}

export function createColumn(title: string, color: ColumnColor): BoardColumn {
  return { id: uuid(), title, color }
}

export const STORAGE_KEY_TASKS = 'tarefa-board-tasks'
export const STORAGE_KEY_COLUMNS = 'tarefa-board-columns'
