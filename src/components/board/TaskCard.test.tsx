import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { TaskCard } from './TaskCard'
import type { Task } from '../../types'

const mockTask: Task = {
  id: '1',
  title: 'Minha Tarefa',
  description: 'Descrição da tarefa',
  status: 'todo',
  createdAt: '2024-01-15T10:30:00.000Z',
  updatedAt: '2024-01-15T10:30:00.000Z',
}

describe('TaskCard', () => {
  it('deve renderizar o título da tarefa', () => {
    render(
      <TaskCard task={mockTask} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('Minha Tarefa')).toBeDefined()
  })

  it('deve renderizar a descrição', () => {
    render(
      <TaskCard task={mockTask} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('Descrição da tarefa')).toBeDefined()
  })

  it('deve renderizar a data formatada', () => {
    render(
      <TaskCard task={mockTask} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('Criado em 15/01/2024')).toBeDefined()
  })

  it('deve chamar onEdit ao clicar no botão editar', async () => {
    const user = userEvent.setup()
    let called = false
    render(
      <TaskCard task={mockTask} onEdit={() => { called = true }} onDelete={() => {}} />
    )
    await user.click(screen.getByLabelText('Editar tarefa'))
    expect(called).toBe(true)
  })

  it('deve chamar onDelete ao clicar no botão excluir', async () => {
    const user = userEvent.setup()
    let called = false
    render(
      <TaskCard task={mockTask} onEdit={() => {}} onDelete={() => { called = true }} />
    )
    await user.click(screen.getByLabelText('Excluir tarefa'))
    expect(called).toBe(true)
  })

  it('não deve renderizar descrição quando vazia', () => {
    const taskWithoutDesc = { ...mockTask, description: '' }
    render(
      <TaskCard task={taskWithoutDesc} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.queryByText('Descrição da tarefa')).toBeNull()
  })
})
