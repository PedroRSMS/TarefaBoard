import { describe, it, expect } from 'vitest'
import { taskReducer } from './taskReducer'
import type { Task } from '../types'

const mockTask: Task = {
  id: '1',
  title: 'Teste',
  description: '',
  status: 'todo',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

describe('taskReducer', () => {
  it('deve adicionar uma tarefa', () => {
    const state = taskReducer([], { type: 'ADD_TASK', payload: mockTask })
    expect(state).toHaveLength(1)
    expect(state[0]).toEqual(mockTask)
  })

  it('deve atualizar uma tarefa', () => {
    const updated = { ...mockTask, title: 'Atualizado' }
    const state = taskReducer([mockTask], { type: 'UPDATE_TASK', payload: updated })
    expect(state[0].title).toBe('Atualizado')
  })

  it('deve excluir uma tarefa', () => {
    const state = taskReducer([mockTask], { type: 'DELETE_TASK', payload: mockTask.id })
    expect(state).toHaveLength(0)
  })

  it('deve definir todas as tarefas', () => {
    const state = taskReducer([], { type: 'SET_TASKS', payload: [mockTask] })
    expect(state).toHaveLength(1)
  })

  it('deve retornar o estado atual para ação desconhecida', () => {
    const state = taskReducer([mockTask], { type: 'UNKNOWN' } as never)
    expect(state).toEqual([mockTask])
  })
})
