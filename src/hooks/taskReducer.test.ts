import { describe, it, expect } from 'vitest'
import { taskReducer, columnReducer } from './taskReducer'
import type { Task, BoardColumn } from '../types'

const mockColumn: BoardColumn = { id: 'col-todo', title: 'A Fazer', color: 'blue' }
const mockTask: Task = {
  id: '1',
  title: 'Teste',
  description: '',
  columnId: 'col-todo',
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

  it('deve mover tarefa para outra coluna', () => {
    const state = taskReducer([mockTask], {
      type: 'MOVE_TASK_TO_COLUMN',
      payload: { taskId: '1', columnId: 'col-done', updatedAt: '2024-02-01T00:00:00.000Z' },
    })
    expect(state[0].columnId).toBe('col-done')
    expect(state[0].updatedAt).toBe('2024-02-01T00:00:00.000Z')
  })

  it('deve retornar o estado atual para ação desconhecida', () => {
    const state = taskReducer([mockTask], { type: 'UNKNOWN' } as never)
    expect(state).toEqual([mockTask])
  })
})

describe('columnReducer', () => {
  it('deve adicionar uma coluna', () => {
    const state = columnReducer([], { type: 'ADD_COLUMN', payload: mockColumn })
    expect(state).toHaveLength(1)
    expect(state[0]).toEqual(mockColumn)
  })

  it('deve atualizar uma coluna', () => {
    const updated = { ...mockColumn, title: 'Novo Nome' }
    const state = columnReducer([mockColumn], { type: 'UPDATE_COLUMN', payload: updated })
    expect(state[0].title).toBe('Novo Nome')
  })

  it('deve excluir uma coluna', () => {
    const state = columnReducer([mockColumn], { type: 'DELETE_COLUMN', payload: mockColumn.id })
    expect(state).toHaveLength(0)
  })

  it('deve definir todas as colunas', () => {
    const state = columnReducer([], { type: 'SET_COLUMNS', payload: [mockColumn] })
    expect(state).toHaveLength(1)
  })
})
