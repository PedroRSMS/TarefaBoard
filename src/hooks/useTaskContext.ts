import { createContext, useContext } from 'react'
import type { Task, TaskStatus } from '../types'
import type { TaskAction } from './taskReducer'

export interface TaskContextValue {
  tasks: Task[]
  dispatch: React.Dispatch<TaskAction>
  addTask: (title: string, description: string) => void
  updateTask: (task: Task, changes: { title?: string; description?: string; status?: TaskStatus }) => void
  deleteTask: (id: string) => void
}

export const TaskContext = createContext<TaskContextValue | null>(null)

export function useTaskContext(): TaskContextValue {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider')
  }
  return context
}
