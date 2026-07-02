import { useReducer, useEffect, useCallback, type ReactNode } from 'react'
import type { Task, BoardColumn, ColumnColor } from '../types'
import { taskReducer, columnReducer } from '../hooks/taskReducer'
import { createTask, updateTaskData } from '../utils/taskUtils'
import { createColumn, getDefaultColumns } from '../constants/status'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEY_TASKS, STORAGE_KEY_COLUMNS } from '../constants/status'
import { TaskContext } from '../hooks/useTaskContext'

export function TaskProvider({ children }: { children: ReactNode }) {
  const [persistedTasks, setPersistedTasks] = useLocalStorage<Task[]>(STORAGE_KEY_TASKS, [])
  const [persistedColumns, setPersistedColumns] = useLocalStorage<BoardColumn[]>(
    STORAGE_KEY_COLUMNS,
    getDefaultColumns()
  )
  const [tasks, dispatch] = useReducer(taskReducer, persistedTasks)
  const [columns, dispatchColumns] = useReducer(columnReducer, persistedColumns)

  useEffect(() => {
    setPersistedTasks(tasks)
  }, [tasks, setPersistedTasks])

  useEffect(() => {
    setPersistedColumns(columns)
  }, [columns, setPersistedColumns])

  const addTask = useCallback(
    (title: string, description: string, columnId: string, tagId?: string, dueDate?: string) => {
      const task = createTask(title, description, columnId, tagId, dueDate)
      dispatch({ type: 'ADD_TASK', payload: task })
    },
    [dispatch]
  )

  const updateTask = useCallback(
    (task: Task, changes: { title?: string; description?: string; columnId?: string; tagId?: string; dueDate?: string }) => {
      const updated = updateTaskData(task, changes)
      dispatch({ type: 'UPDATE_TASK', payload: updated })
    },
    [dispatch]
  )

  const deleteTask = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_TASK', payload: id })
    },
    [dispatch]
  )

  const addColumn = useCallback(
    (title: string, color: ColumnColor) => {
      const column = createColumn(title, color)
      dispatchColumns({ type: 'ADD_COLUMN', payload: column })
    },
    [dispatchColumns]
  )

  const updateColumn = useCallback(
    (column: BoardColumn) => {
      dispatchColumns({ type: 'UPDATE_COLUMN', payload: column })
    },
    [dispatchColumns]
  )

  const deleteColumn = useCallback(
    (id: string) => {
      dispatchColumns({ type: 'DELETE_COLUMN', payload: id })
      tasks
        .filter((t) => t.columnId === id)
        .forEach((t) => dispatch({ type: 'DELETE_TASK', payload: t.id }))
    },
    [dispatchColumns, tasks, dispatch]
  )

  return (
    <TaskContext.Provider
      value={{
        tasks,
        columns,
        dispatch,
        dispatchColumns,
        addTask,
        updateTask,
        deleteTask,
        addColumn,
        updateColumn,
        deleteColumn,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
