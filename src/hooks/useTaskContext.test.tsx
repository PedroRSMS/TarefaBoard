import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { TaskProvider } from '../components/TaskProvider'
import { useTaskContext } from './useTaskContext'
import type { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <TaskProvider>{children}</TaskProvider>
}

describe('useTaskContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve retornar tasks vazio inicialmente', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })
    expect(result.current.tasks).toEqual([])
  })

  it('deve ter colunas padrão', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })
    expect(result.current.columns).toHaveLength(3)
  })

  it('deve adicionar uma tarefa', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })

    act(() => {
      result.current.addTask('Nova Tarefa', 'Descrição', 'col-todo')
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Nova Tarefa')
    expect(result.current.tasks[0].columnId).toBe('col-todo')
    expect(result.current.tasks[0].order).toBe(0)
  })

  it('deve incrementar order ao adicionar múltiplas tarefas na mesma coluna', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })

    act(() => {
      result.current.addTask('Tarefa 1', '', 'col-todo')
      result.current.addTask('Tarefa 2', '', 'col-todo')
    })

    expect(result.current.tasks[0].order).toBe(0)
    expect(result.current.tasks[1].order).toBe(1)
  })

  it('deve atualizar uma tarefa', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })

    act(() => {
      result.current.addTask('Original', '', 'col-todo')
    })

    const task = result.current.tasks[0]

    act(() => {
      result.current.updateTask(task, { title: 'Atualizada' })
    })

    expect(result.current.tasks[0].title).toBe('Atualizada')
  })

  it('deve excluir uma tarefa', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })

    act(() => {
      result.current.addTask('Para Excluir', '', 'col-todo')
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.deleteTask(taskId)
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it('deve reordenar tarefas na mesma coluna', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })

    act(() => {
      result.current.addTask('Primeira', '', 'col-todo')
      result.current.addTask('Segunda', '', 'col-todo')
    })

    const [first, second] = result.current.tasks

    act(() => {
      result.current.reorderTask(second.id, first.id)
    })

    expect(result.current.tasks.find((t) => t.id === second.id)?.order).toBe(0)
    expect(result.current.tasks.find((t) => t.id === first.id)?.order).toBe(1)
  })

  it('deve adicionar uma coluna', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })

    act(() => {
      result.current.addColumn('Nova Coluna', 'purple')
    })

    expect(result.current.columns).toHaveLength(4)
    expect(result.current.columns[3].title).toBe('Nova Coluna')
    expect(result.current.columns[3].color).toBe('purple')
  })

  it('deve atualizar uma coluna', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })
    const column = result.current.columns[0]

    act(() => {
      result.current.updateColumn({ ...column, title: 'Renomeada' })
    })

    expect(result.current.columns[0].title).toBe('Renomeada')
  })

  it('deve excluir coluna e as tarefas associadas', () => {
    const { result } = renderHook(() => useTaskContext(), { wrapper })

    act(() => {
      result.current.addTask('Tarefa', '', 'col-todo')
    })

    expect(result.current.tasks).toHaveLength(1)

    act(() => {
      result.current.deleteColumn('col-todo')
    })

    expect(result.current.columns).toHaveLength(2)
    expect(result.current.tasks).toHaveLength(0)
  })

  it('deve normalizar tarefas sem order vindas do localStorage', () => {
    const storedTasks = [
      { id: '1', title: 'A', description: '', columnId: 'col-todo', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: '2', title: 'B', description: '', columnId: 'col-todo', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    ]
    localStorage.setItem('tarefa-board-tasks', JSON.stringify(storedTasks))

    const { result } = renderHook(() => useTaskContext(), { wrapper })

    expect(result.current.tasks[0].order).toBe(0)
    expect(result.current.tasks[1].order).toBe(1)
  })

  it('deve lançar erro se usado fora do Provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useTaskContext())
    }).toThrow('useTaskContext deve ser usado dentro de um TaskProvider')

    vi.restoreAllMocks()
  })
})
