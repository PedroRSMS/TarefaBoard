import { v4 as uuid } from 'uuid'
import type { Task, TaskStatus } from '../types'

export function createTask(title: string, description: string): Task {
  const now = new Date().toISOString()
  return {
    id: uuid(),
    title: title.trim(),
    description: description.trim(),
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  }
}

export function updateTaskData(
  task: Task,
  changes: { title?: string; description?: string; status?: TaskStatus }
): Task {
  return {
    ...task,
    ...changes,
    updatedAt: new Date().toISOString(),
  }
}

export function validateTitle(title: string): string | null {
  const trimmed = title.trim()
  if (trimmed.length === 0) {
    return 'O título é obrigatório (máx. 120 caracteres)'
  }
  if (trimmed.length > 120) {
    return 'O título é obrigatório (máx. 120 caracteres)'
  }
  return null
}

export function validateDescription(description: string): string | null {
  if (description.length > 500) {
    return 'A descrição deve ter no máximo 500 caracteres'
  }
  return null
}
