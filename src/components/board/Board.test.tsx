import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { DndContext } from '@dnd-kit/core'
import { TaskProvider } from '../TaskProvider'
import { Board } from './Board'
import type { Task, BoardColumn } from '../../types'

const mockColumns: BoardColumn[] = [
  { id: 'col-todo', title: 'A Fazer', color: 'blue' },
  { id: 'col-done', title: 'Concluido', color: 'green' },
]

function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    title: 'Tarefa Teste',
    description: '',
    columnId: 'col-todo',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('Board', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve mostrar mensagem quando não há tarefas', () => {
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={[]}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )
    expect(
      screen.getByText('Nenhuma tarefa encontrada para os filtros atuais')
    ).toBeDefined()
  })

  it('deve mostrar mensagem quando nenhum status selecionado', () => {
    render(
      <TaskProvider>
        <Board
          tasks={[]}
          columns={mockColumns}
          selectedColumnIds={[]}
          onUpdateTask={() => {}}
          onDeleteTask={() => {}}
          onAddColumn={() => {}}
          onUpdateColumn={() => {}}
          onDeleteColumn={() => {}}
        />
      </TaskProvider>
    )
    expect(screen.getByText('Selecione ao menos um status')).toBeDefined()
  })

  it('deve renderizar colunas com tarefas', () => {
    const tasks = [createMockTask({ id: '1', title: 'Tarefa 1', columnId: 'col-todo' })]
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )
    expect(screen.getByText('Tarefa 1')).toBeDefined()
  })

  it('deve abrir modal de exclusão de tarefa', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa Teste', columnId: 'col-todo' })]

    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Excluir tarefa'))
    expect(
      screen.getByText(/Tem certeza que deseja excluir a tarefa/)
    ).toBeDefined()
  })
})
