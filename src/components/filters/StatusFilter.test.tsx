import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { StatusFilter } from './StatusFilter'
import type { BoardColumn } from '../../types'

const mockColumns: BoardColumn[] = [
  { id: 'col-todo', title: 'A Fazer', color: 'blue' },
  { id: 'col-progress', title: 'Em Progresso', color: 'amber' },
  { id: 'col-done', title: 'Concluido', color: 'green' },
]

describe('StatusFilter', () => {
  it('deve renderizar todos os chips de status', () => {
    render(
      <StatusFilter
        columns={mockColumns}
        selectedIds={['col-todo', 'col-progress', 'col-done']}
        onChange={() => {}}
      />
    )
    expect(screen.getByText('A Fazer')).toBeDefined()
    expect(screen.getByText('Em Progresso')).toBeDefined()
    expect(screen.getByText('Concluido')).toBeDefined()
  })

  it('deve marcar chips ativos com aria-pressed', () => {
    render(
      <StatusFilter
        columns={mockColumns}
        selectedIds={['col-todo']}
        onChange={() => {}}
      />
    )
    expect(screen.getByLabelText('Filtrar A Fazer').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByLabelText('Filtrar Em Progresso').getAttribute('aria-pressed')).toBe('false')
  })

  it('deve chamar onChange ao clicar em um chip', async () => {
    const user = userEvent.setup()
    let result: string[] = []
    render(
      <StatusFilter
        columns={mockColumns}
        selectedIds={['col-todo', 'col-progress', 'col-done']}
        onChange={(s) => { result = s }}
      />
    )
    await user.click(screen.getByLabelText('Filtrar A Fazer'))
    expect(result).toEqual(['col-progress', 'col-done'])
  })
})
