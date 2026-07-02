import type { Task, BoardColumn } from '../types'

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'MOVE_TASK_TO_COLUMN'; payload: { taskId: string; columnId: string; updatedAt: string } }

export type ColumnAction =
  | { type: 'ADD_COLUMN'; payload: BoardColumn }
  | { type: 'UPDATE_COLUMN'; payload: BoardColumn }
  | { type: 'DELETE_COLUMN'; payload: string }
  | { type: 'SET_COLUMNS'; payload: BoardColumn[] }

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload, ...state]
    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      )
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)
    case 'SET_TASKS':
      return action.payload
    case 'MOVE_TASK_TO_COLUMN':
      return state.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, columnId: action.payload.columnId, updatedAt: action.payload.updatedAt }
          : task
      )
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
