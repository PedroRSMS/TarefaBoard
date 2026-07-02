import type { TaskStatus } from '../types'

export const STATUS_LABELS: Record<TaskStatus, string> = {
  'todo': 'A Fazer',
  'in-progress': 'Em Progresso',
  'done': 'Concluído',
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  'todo': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'done': 'bg-green-500/20 text-green-400 border-green-500/30',
}

export const STATUS_DOT_COLORS: Record<TaskStatus, string> = {
  'todo': 'bg-blue-500',
  'in-progress': 'bg-amber-500',
  'done': 'bg-green-500',
}

export const STATUS_ORDER: TaskStatus[] = ['todo', 'in-progress', 'done']

export const STORAGE_KEY = 'tarefa-board-tasks'
