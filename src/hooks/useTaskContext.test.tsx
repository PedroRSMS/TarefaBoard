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
  })

  it('deve lançar erro se usado fora do Provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useTaskContext())
    }).toThrow('useTaskContext deve ser usado dentro de um TaskProvider')

    vi.restoreAllMocks()
  })
})
