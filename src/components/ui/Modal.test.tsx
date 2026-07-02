import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Modal } from './Modal'

describe('Modal', () => {
  it('não deve renderizar quando isOpen é false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Teste">
        <p>Conteúdo</p>
      </Modal>
    )
    expect(screen.queryByText('Conteúdo')).toBeNull()
  })

  it('deve renderizar quando isOpen é true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Título Modal">
        <p>Conteúdo</p>
      </Modal>
    )
    expect(screen.getByText('Título Modal')).toBeDefined()
    expect(screen.getByText('Conteúdo')).toBeDefined()
  })

  it('deve chamar onClose ao clicar no botão fechar', async () => {
    const user = userEvent.setup()
    let closed = false
    render(
      <Modal isOpen={true} onClose={() => { closed = true }} title="Título">
        <p>Conteúdo</p>
      </Modal>
    )
    await user.click(screen.getByLabelText('Fechar modal'))
    expect(closed).toBe(true)
  })

  it('deve chamar onClose ao pressionar Escape', async () => {
    const user = userEvent.setup()
    let closed = false
    render(
      <Modal isOpen={true} onClose={() => { closed = true }} title="Título">
        <p>Conteúdo</p>
      </Modal>
    )
    await user.keyboard('{Escape}')
    expect(closed).toBe(true)
  })
})
