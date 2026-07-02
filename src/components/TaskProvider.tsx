import { useReducer, useEffect, useCallback, type ReactNode } from 'react'
import type { Task, TaskStatus } from '../types'
import { taskReducer } from '../hooks/taskReducer'
import { createTask, updateTaskData } from '../utils/taskUtils'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEY } from '../constants/status'
import { TaskContext } from '../hooks/useTaskContext'

export function TaskProvider({ children }: { children: ReactNode }) {
  const [persistedTasks, setPersistedTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [])
  const [tasks, dispatch] = useReducer(taskReducer, persistedTasks)

  useEffect(() => {
    setPersistedTasks(tasks)
  }, [tasks, setPersistedTasks])

  const addTask = useCallback(
    (title: string, description: string) => {
      const task = createTask(title, description)
      dispatch({ type: 'ADD_TASK', payload: task })
    },
    [dispatch]
  )

  const updateTask = useCallback(
    (task: Task, changes: { title?: string; description?: string; status?: TaskStatus }) => {
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

  return (
    <TaskContext.Provider value={{ tasks, dispatch, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
