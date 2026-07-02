import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { DndContext } from '@dnd-kit/core'
import { TaskProvider } from '../TaskProvider'
import { Board } from './Board'
import type { Task } from '../../types'

function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    title: 'Tarefa Teste',
    description: '',
    status: 'todo',
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
            selectedStatuses={['todo', 'in-progress', 'done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
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
          selectedStatuses={[]}
          onUpdateTask={() => {}}
          onDeleteTask={() => {}}
        />
      </TaskProvider>
    )
    expect(screen.getByText('Selecione ao menos um status')).toBeDefined()
  })

  it('deve renderizar colunas com tarefas', () => {
    const tasks = [createMockTask({ id: '1', title: 'Tarefa 1', status: 'todo' })]
    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            selectedStatuses={['todo', 'in-progress', 'done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )
    expect(screen.getByText('Tarefa 1')).toBeDefined()
  })

  it('deve abrir modal de exclusão ao clicar em excluir', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa Teste', status: 'todo' })]

    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            selectedStatuses={['todo', 'in-progress', 'done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Excluir tarefa'))
    expect(
      screen.getByText(/Tem certeza que deseja excluir a tarefa/)
    ).toBeDefined()
  })

  it('deve abrir modal de edição ao clicar em editar', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa Teste', status: 'todo' })]

    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            selectedStatuses={['todo', 'in-progress', 'done']}
            onUpdateTask={() => {}}
            onDeleteTask={() => {}}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Editar tarefa'))
    expect(screen.getByText('Editar Tarefa')).toBeDefined()
  })

  it('deve chamar onDeleteTask ao confirmar exclusão', async () => {
    const user = userEvent.setup()
    const tasks = [createMockTask({ id: '1', title: 'Tarefa Teste', status: 'todo' })]
    let deletedId = ''

    render(
      <TaskProvider>
        <DndContext>
          <Board
            tasks={tasks}
            selectedStatuses={['todo', 'in-progress', 'done']}
            onUpdateTask={() => {}}
            onDeleteTask={(id) => { deletedId = id }}
          />
        </DndContext>
      </TaskProvider>
    )

    await user.click(screen.getByLabelText('Excluir tarefa'))
    await user.click(screen.getByText('Excluir'))
    expect(deletedId).toBe('1')
  })
})
