import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Column } from './Column'
import type { Task } from '../../types'

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Tarefa 1',
    description: '',
    status: 'todo',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Tarefa 2',
    description: '',
    status: 'todo',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

describe('Column', () => {
  it('deve renderizar o nome da coluna', () => {
    render(
      <Column status="todo" tasks={[]} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('A Fazer')).toBeDefined()
  })

  it('deve renderizar o contador de tarefas', () => {
    render(
      <Column status="todo" tasks={mockTasks} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('2')).toBeDefined()
  })

  it('deve mostrar mensagem quando vazia', () => {
    render(
      <Column status="todo" tasks={[]} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('Nenhuma tarefa neste status')).toBeDefined()
  })

  it('deve renderizar os cards das tarefas', () => {
    render(
      <Column status="todo" tasks={mockTasks} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('Tarefa 1')).toBeDefined()
    expect(screen.getByText('Tarefa 2')).toBeDefined()
  })
})
