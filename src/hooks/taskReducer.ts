import { arrayMove } from '@dnd-kit/sortable'
import type { Task, BoardColumn } from '../types'

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'MOVE_TASK_TO_COLUMN'; payload: { taskId: string; columnId: string; updatedAt: string } }
  | { type: 'REORDER_TASKS'; payload: { activeId: string; overId: string } }

export type ColumnAction =
  | { type: 'ADD_COLUMN'; payload: BoardColumn }
  | { type: 'UPDATE_COLUMN'; payload: BoardColumn }
  | { type: 'DELETE_COLUMN'; payload: string }
  | { type: 'SET_COLUMNS'; payload: BoardColumn[] }

function getNextOrder(tasks: Task[], columnId: string): number {
  return tasks
    .filter((task) => task.columnId === columnId)
    .reduce((max, task) => Math.max(max, task.order), -1) + 1
}

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK': {
      const order = getNextOrder(state, action.payload.columnId)
      const task = { ...action.payload, order }
      return [...state, task]
    }
    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      )
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)
    case 'SET_TASKS':
      return action.payload
    case 'MOVE_TASK_TO_COLUMN': {
      const targetColumnId = action.payload.columnId
      const order = getNextOrder(state, targetColumnId)
      return state.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, columnId: targetColumnId, order, updatedAt: action.payload.updatedAt }
          : task
      )
    }
    case 'REORDER_TASKS': {
      const { activeId, overId } = action.payload
      const activeTask = state.find((task) => task.id === activeId)
      const overTask = state.find((task) => task.id === overId)

      if (!activeTask || !overTask || activeTask.columnId !== overTask.columnId) {
        return state
      }

      const columnTasks = state
        .filter((task) => task.columnId === activeTask.columnId)
        .sort((a, b) => a.order - b.order)

      const activeIndex = columnTasks.findIndex((task) => task.id === activeId)
      const overIndex = columnTasks.findIndex((task) => task.id === overId)

      if (activeIndex === -1 || overIndex === -1) {
        return state
      }

      const reordered = arrayMove(columnTasks, activeIndex, overIndex)
      const now = new Date().toISOString()

      return state.map((task) => {
        const index = reordered.findIndex((t) => t.id === task.id)
        if (index === -1) return task
        return { ...task, order: index, updatedAt: now }
      })
    }
    default:
      return state
  }
}

export function columnReducer(state: BoardColumn[], action: ColumnAction): BoardColumn[] {
  switch (action.type) {
    case 'ADD_COLUMN':
      return [...state, action.payload]
    case 'UPDATE_COLUMN':
      return state.map((col) =>
        col.id === action.payload.id ? action.payload : col
      )
    case 'DELETE_COLUMN':
      return state.filter((col) => col.id !== action.payload)
    case 'SET_COLUMNS':
      return action.payload
    default:
      return state
  }
}
