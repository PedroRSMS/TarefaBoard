import { createContext, useContext } from 'react'
import type { Task, BoardColumn, ColumnColor } from '../types'
import type { TaskAction, ColumnAction } from './taskReducer'

export interface TaskContextValue {
  tasks: Task[]
  columns: BoardColumn[]
  dispatch: React.Dispatch<TaskAction>
  dispatchColumns: React.Dispatch<ColumnAction>
  addTask: (title: string, description: string, columnId: string, tagId?: string, dueDate?: string) => void
  updateTask: (task: Task, changes: { title?: string; description?: string; columnId?: string; tagId?: string; dueDate?: string }) => void
  deleteTask: (id: string) => void
  addColumn: (title: string, color: ColumnColor) => void
  updateColumn: (column: BoardColumn) => void
  deleteColumn: (id: string) => void
}

export const TaskContext = createContext<TaskContextValue | null>(null)

export function useTaskContext(): TaskContextValue {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider')
  }
  return context
}
