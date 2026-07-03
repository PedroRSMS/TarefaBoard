import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { DndContext } from '@dnd-kit/core'
import { Column } from './Column'
import type { Task, BoardColumn } from '../../types'

const mockColumn: BoardColumn = { id: 'col-todo', title: 'A Fazer', color: 'blue' }

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Tarefa 1',
    description: '',
    columnId: 'col-todo',
    order: 0,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Tarefa 2',
    description: '',
    columnId: 'col-todo',
    order: 1,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

function renderWithDnd(ui: React.ReactElement) {
  return render(
    <DndContext>
      {ui}
    </DndContext>
  )
}

describe('Column', () => {
  it('deve renderizar o nome da coluna', () => {
    renderWithDnd(
      <Column column={mockColumn} tasks={[]} onEdit={() => {}} onDelete={() => {}} onEditColumn={() => {}} onDeleteColumn={() => {}} />
    )
    expect(screen.getByText('A Fazer')).toBeDefined()
  })

  it('deve renderizar o contador de tarefas', () => {
    renderWithDnd(
      <Column column={mockColumn} tasks={mockTasks} onEdit={() => {}} onDelete={() => {}} onEditColumn={() => {}} onDeleteColumn={() => {}} />
    )
    expect(screen.getByText('2')).toBeDefined()
  })

  it('deve mostrar mensagem quando vazia', () => {
    renderWithDnd(
      <Column column={mockColumn} tasks={[]} onEdit={() => {}} onDelete={() => {}} onEditColumn={() => {}} onDeleteColumn={() => {}} />
    )
    expect(screen.getByText('Nenhuma tarefa neste status')).toBeDefined()
  })

  it('deve renderizar os cards das tarefas', () => {
    renderWithDnd(
      <Column column={mockColumn} tasks={mockTasks} onEdit={() => {}} onDelete={() => {}} onEditColumn={() => {}} onDeleteColumn={() => {}} />
    )
    expect(screen.getByText('Tarefa 1')).toBeDefined()
    expect(screen.getByText('Tarefa 2')).toBeDefined()
  })

  it('deve chamar onEditColumn ao clicar em editar', async () => {
    const user = userEvent.setup()
    let called = false
    renderWithDnd(
      <Column column={mockColumn} tasks={[]} onEdit={() => {}} onDelete={() => {}} onEditColumn={() => { called = true }} onDeleteColumn={() => {}} />
    )
    await user.click(screen.getByLabelText('Editar coluna A Fazer'))
    expect(called).toBe(true)
  })

  it('deve chamar onDeleteColumn ao clicar em excluir', async () => {
    const user = userEvent.setup()
    let called = false
    renderWithDnd(
      <Column column={mockColumn} tasks={[]} onEdit={() => {}} onDelete={() => {}} onEditColumn={() => {}} onDeleteColumn={() => { called = true }} />
    )
    await user.click(screen.getByLabelText('Excluir coluna A Fazer'))
    expect(called).toBe(true)
  })
})
