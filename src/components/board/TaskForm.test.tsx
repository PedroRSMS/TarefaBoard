import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { TaskForm } from './TaskForm'
import type { Task } from '../../types'

const mockTask: Task = {
  id: '1',
  title: 'Tarefa Original',
  description: 'Descrição original',
  status: 'todo',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

describe('TaskForm', () => {
  it('deve renderizar formulário de criação', () => {
    render(
      <TaskForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        submitLabel="Criar"
      />
    )
    expect(screen.getByText('Nova Tarefa')).toBeDefined()
    expect(screen.getByLabelText('Título')).toBeDefined()
    expect(screen.getByLabelText('Descrição')).toBeDefined()
    expect(screen.getByText('Criar')).toBeDefined()
  })

  it('deve preencher campos ao editar tarefa', () => {
    render(
      <TaskForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        initialTask={mockTask}
        submitLabel="Salvar"
      />
    )
    expect(screen.getByText('Editar Tarefa')).toBeDefined()
    const titleInput = screen.getByLabelText('Título') as HTMLInputElement
    expect(titleInput.value).toBe('Tarefa Original')
    const descInput = screen.getByLabelText('Descrição') as HTMLTextAreaElement
    expect(descInput.value).toBe('Descrição original')
  })

  it('deve desabilitar botão com título vazio', () => {
    render(
      <TaskForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        submitLabel="Criar"
      />
    )
    const submitButton = screen.getByText('Criar')
    expect(submitButton.hasAttribute('disabled')).toBe(true)
  })

  it('deve chamar onSubmit com os dados preenchidos', async () => {
    const user = userEvent.setup()
    let submittedTitle = ''
    let submittedDesc = ''

    render(
      <TaskForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={(title, description) => {
          submittedTitle = title
          submittedDesc = description
        }}
        submitLabel="Criar"
      />
    )

    await user.type(screen.getByLabelText('Título'), 'Nova Tarefa')
    await user.type(screen.getByLabelText('Descrição'), 'Descrição')
    await user.click(screen.getByText('Criar'))

    expect(submittedTitle).toBe('Nova Tarefa')
    expect(submittedDesc).toBe('Descrição')
  })

  it('deve exibir mensagem de erro para título muito longo', async () => {
    const user = userEvent.setup()
    render(
      <TaskForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        submitLabel="Criar"
      />
    )
    await user.type(screen.getByLabelText('Título'), 'a'.repeat(121))
    expect(
      screen.getByText('O título é obrigatório (máx. 120 caracteres)')
    ).toBeDefined()
  })
})
