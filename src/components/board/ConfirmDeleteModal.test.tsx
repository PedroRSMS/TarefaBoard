import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'

describe('ConfirmDeleteModal', () => {
  it('deve exibir o título da tarefa na mensagem', () => {
    render(
      <ConfirmDeleteModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        taskTitle="Minha Tarefa Importante"
      />
    )
    expect(
      screen.getByText(/Tem certeza que deseja excluir a tarefa/)
    ).toBeDefined()
    expect(screen.getByText(/Minha Tarefa Importante/)).toBeDefined()
  })

  it('deve chamar onConfirm ao clicar em Excluir', async () => {
    const user = userEvent.setup()
    let confirmed = false
    render(
      <ConfirmDeleteModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => { confirmed = true }}
        taskTitle="Teste"
      />
    )
    await user.click(screen.getByText('Excluir'))
    expect(confirmed).toBe(true)
  })

  it('deve chamar onClose ao clicar em Cancelar', async () => {
    const user = userEvent.setup()
    let closed = false
    render(
      <ConfirmDeleteModal
        isOpen={true}
        onClose={() => { closed = true }}
        onConfirm={() => {}}
        taskTitle="Teste"
      />
    )
    await user.click(screen.getByText('Cancelar'))
    expect(closed).toBe(true)
  })
})
