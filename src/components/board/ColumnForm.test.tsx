import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ColumnForm } from './ColumnForm'
import type { BoardColumn } from '../../types'

const mockColumn: BoardColumn = { id: 'col-1', title: 'Em Andamento', color: 'amber' }

describe('ColumnForm', () => {
  it('deve renderizar formulário de criação', () => {
    render(
      <ColumnForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    )
    expect(screen.getByText('Nova Coluna')).toBeDefined()
    expect(screen.getByLabelText('Nome')).toBeDefined()
    expect(screen.getByText('Criar')).toBeDefined()
  })

  it('deve renderizar formulário de edição pré-preenchido', () => {
    render(
      <ColumnForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        initialColumn={mockColumn}
      />
    )
    expect(screen.getByText('Editar Coluna')).toBeDefined()
    const input = screen.getByLabelText('Nome') as HTMLInputElement
    expect(input.value).toBe('Em Andamento')
    expect(screen.getByText('Salvar')).toBeDefined()
  })

  it('deve chamar onSubmit ao criar coluna', async () => {
    const user = userEvent.setup()
    let submittedTitle = ''
    let submittedColor = ''

    render(
      <ColumnForm isOpen={true} onClose={() => {}} onSubmit={(title, color) => {
        submittedTitle = title
        submittedColor = color
      }} />
    )

    await user.type(screen.getByLabelText('Nome'), 'Nova Coluna')
    await user.click(screen.getByText('Criar'))

    expect(submittedTitle).toBe('Nova Coluna')
    expect(submittedColor).toBe('blue')
  })

  it('deve chamar onSubmit ao editar coluna', async () => {
    const user = userEvent.setup()
    let submittedTitle = ''

    render(
      <ColumnForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={(title) => { submittedTitle = title }}
        initialColumn={mockColumn}
      />
    )

    await user.clear(screen.getByLabelText('Nome'))
    await user.type(screen.getByLabelText('Nome'), 'Renomeada')
    await user.click(screen.getByText('Salvar'))

    expect(submittedTitle).toBe('Renomeada')
  })

  it('deve desabilitar botão com nome vazio', () => {
    render(
      <ColumnForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    )
    const submitButton = screen.getByText('Criar')
    expect(submitButton.hasAttribute('disabled')).toBe(true)
  })

  it('deve fechar ao clicar em Cancelar', async () => {
    const user = userEvent.setup()
    let closed = false
    render(
      <ColumnForm isOpen={true} onClose={() => { closed = true }} onSubmit={() => {}} />
    )
    await user.click(screen.getByText('Cancelar'))
    expect(closed).toBe(true)
  })
})
