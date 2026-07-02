import { v4 as uuid } from 'uuid'
import type { Task } from '../types'

export function createTask(
  title: string,
  description: string,
  columnId: string,
  tagId?: string,
  dueDate?: string
): Task {
  const now = new Date().toISOString()
  return {
    id: uuid(),
    title: title.trim(),
    description: description.trim(),
    columnId,
    createdAt: now,
    updatedAt: now,
    tagId: tagId || undefined,
    dueDate: dueDate || undefined,
  }
}

export function updateTaskData(
  task: Task,
  changes: {
    title?: string
    description?: string
    columnId?: string
    tagId?: string
    dueDate?: string
  }
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
