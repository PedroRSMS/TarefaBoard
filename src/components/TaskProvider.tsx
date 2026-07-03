import { useReducer, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import type { Task, BoardColumn, ColumnColor } from '../types'
import { taskReducer, columnReducer } from '../hooks/taskReducer'
import { createTask, updateTaskData } from '../utils/taskUtils'
import { createColumn, getDefaultColumns } from '../constants/status'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEY_TASKS, STORAGE_KEY_COLUMNS } from '../constants/status'
import { TaskContext } from '../hooks/useTaskContext'

function normalizeTasks(tasks: Task[]): Task[] {
  const hasMissingOrder = tasks.some((task) => task.order === undefined)
  if (!hasMissingOrder) return tasks

  const byColumn = new Map<string, Task[]>()
  tasks.forEach((task) => {
    const list = byColumn.get(task.columnId) ?? []
    list.push(task)
    byColumn.set(task.columnId, list)
  })

  const result: Task[] = []
  byColumn.forEach((columnTasks) => {
    columnTasks.forEach((task, index) => {
      result.push({ ...task, order: task.order ?? index })
    })
  })

  return result
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [persistedTasks, setPersistedTasks] = useLocalStorage<Task[]>(STORAGE_KEY_TASKS, [])
  const [persistedColumns, setPersistedColumns] = useLocalStorage<BoardColumn[]>(
    STORAGE_KEY_COLUMNS,
    getDefaultColumns()
  )

  const normalizedTasks = useMemo(() => normalizeTasks(persistedTasks), [persistedTasks])
  const [tasks, dispatch] = useReducer(taskReducer, normalizedTasks)
  const [columns, dispatchColumns] = useReducer(columnReducer, persistedColumns)

  useEffect(() => {
    setPersistedTasks(tasks)
  }, [tasks, setPersistedTasks])

  useEffect(() => {
    setPersistedColumns(columns)
  }, [columns, setPersistedColumns])

  const addTask = useCallback(
    (title: string, description: string, columnId: string, tagId?: string, dueDate?: string) => {
      const order = tasks
        .filter((task) => task.columnId === columnId)
        .reduce((max, task) => Math.max(max, task.order), -1) + 1
      const task = createTask(title, description, columnId, order, tagId, dueDate)
      dispatch({ type: 'ADD_TASK', payload: task })
    },
    [dispatch, tasks]
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

  const reorderTask = useCallback(
    (activeId: string, overId: string) => {
      dispatch({ type: 'REORDER_TASKS', payload: { activeId, overId } })
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
        reorderTask,
        addColumn,
        updateColumn,
        deleteColumn,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
