import { describe, it, expect, beforeEach, vi } from 'vitest'
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
    order: 0,
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
            onReorderTask={() => {}}
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
          onReorderTask={() => {}}
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
            onReorderTask={() => {}}
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
            onReorderTask={() => {}}
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

  it('deve editar uma tarefa ao salvar no modal', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa Teste', columnId: 'col-todo' })]
    const onUpdateTask = vi.fn()

    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={onUpdateTask}
            onDeleteTask={() => {}}
            onReorderTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Editar tarefa'))
    await user.clear(screen.getByLabelText('Título'))
    await user.type(screen.getByLabelText('Título'), 'Tarefa Editada')
    await user.click(screen.getByText('Salvar'))

    expect(onUpdateTask).toHaveBeenCalled()
    expect(onUpdateTask.mock.calls[0][1].title).toBe('Tarefa Editada')
  })

  it('deve excluir uma tarefa ao confirmar no modal', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa Teste', columnId: 'col-todo' })]
    const onDeleteTask = vi.fn()

    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={onDeleteTask}
            onReorderTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Excluir tarefa'))
    await user.click(screen.getByText('Excluir'))

    expect(onDeleteTask).toHaveBeenCalledWith('1')
  })

  it('deve abrir modal de criação de coluna', async () => {
    const user = userEvent.setup()
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={[]}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onReorderTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByText('+ Nova Coluna'))
    expect(screen.getByText('Nova Coluna')).toBeDefined()
  })

  it('deve criar uma coluna ao salvar no modal', async () => {
    const user = userEvent.setup()
    const onAddColumn = vi.fn()
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={[]}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onReorderTask={() => {}}
            onAddColumn={onAddColumn}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByText('+ Nova Coluna'))
    await user.type(screen.getByLabelText('Nome'), 'Revisão')
    await user.click(screen.getByText('Criar'))

    expect(onAddColumn).toHaveBeenCalledWith('Revisão', 'blue')
  })

  it('deve abrir modal de edição de coluna', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa', columnId: 'col-todo' })]
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onReorderTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Editar coluna A Fazer'))
    expect(screen.getByText('Editar Coluna')).toBeDefined()
  })

  it('deve editar uma coluna ao salvar no modal', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa', columnId: 'col-todo' })]
    const onUpdateColumn = vi.fn()
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onReorderTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={onUpdateColumn}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Editar coluna A Fazer'))
    await user.clear(screen.getByLabelText('Nome'))
    await user.type(screen.getByLabelText('Nome'), 'A Fazer Editado')
    await user.click(screen.getByText('Salvar'))

    expect(onUpdateColumn).toHaveBeenCalled()
    expect(onUpdateColumn.mock.calls[0][0].title).toBe('A Fazer Editado')
  })

  it('deve abrir modal de exclusão de coluna', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa', columnId: 'col-todo' })]
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onReorderTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Excluir coluna A Fazer'))
    expect(
      screen.getByText(/Tem certeza que deseja excluir a coluna/)
    ).toBeDefined()
  })

  it('deve excluir uma coluna ao confirmar no modal', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa', columnId: 'col-todo' })]
    const onDeleteColumn = vi.fn()
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            columns={mockColumns}
            selectedColumnIds={['col-todo', 'col-done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
            onReorderTask={() => {}}
            onAddColumn={() => {}}
            onUpdateColumn={() => {}}
            onDeleteColumn={onDeleteColumn}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Excluir coluna A Fazer'))
    await user.click(screen.getByText('Excluir'))

    expect(onDeleteColumn).toHaveBeenCalledWith('col-todo')
  })
})
