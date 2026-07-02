import { describe, it, expect } from 'vitest'
import { createTask, updateTaskData, validateTitle, validateDescription } from './taskUtils'
import type { Task } from '../types'

describe('taskUtils', () => {
  describe('createTask', () => {
    it('deve criar uma tarefa com columnId especificado', () => {
      const task = createTask('Título', 'Descrição', 'col-todo')
      expect(task.title).toBe('Título')
      expect(task.description).toBe('Descrição')
      expect(task.columnId).toBe('col-todo')
      expect(task.id).toBeTruthy()
      expect(task.createdAt).toBeTruthy()
      expect(task.updatedAt).toBeTruthy()
    })
  })

  describe('validateTitle', () => {
    it('deve retornar erro para título vazio', () => {
      expect(validateTitle('')).toBe('O título é obrigatório (máx. 120 caracteres)')
      expect(validateTitle('   ')).toBe('O título é obrigatório (máx. 120 caracteres)')
    })

    it('deve retornar erro para título muito longo', () => {
      const long = 'a'.repeat(121)
      expect(validateTitle(long)).toBe('O título é obrigatório (máx. 120 caracteres)')
    })

    it('deve retornar null para título válido', () => {
      expect(validateTitle('Título válido')).toBeNull()
    })
  })

  describe('validateDescription', () => {
    it('deve retornar erro para descrição muito longa', () => {
      const long = 'a'.repeat(501)
      expect(validateDescription(long)).toBe('A descrição deve ter no máximo 500 caracteres')
    })

    it('deve retornar null para descrição válida', () => {
      expect(validateDescription('')).toBeNull()
      expect(validateDescription('Descrição válida')).toBeNull()
    })
  })

  describe('updateTaskData', () => {
    it('deve atualizar campos e updatedAt', () => {
      const task: Task = {
        id: '1',
        title: 'Original',
        description: '',
        columnId: 'col-todo',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      }
      const updated = updateTaskData(task, { title: 'Novo' })
      expect(updated.title).toBe('Novo')
      expect(updated.updatedAt).not.toBe(task.updatedAt)
      expect(updated.id).toBe(task.id)
      expect(updated.createdAt).toBe(task.createdAt)
    })
  })
})
