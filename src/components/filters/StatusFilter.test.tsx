import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { StatusFilter } from './StatusFilter'
import type { TaskStatus } from '../../types'

describe('StatusFilter', () => {
  it('deve renderizar todos os chips de status', () => {
    render(
      <StatusFilter
        selected={['todo', 'in-progress', 'done']}
        onChange={() => {}}
      />
    )
    expect(screen.getByText('A Fazer')).toBeDefined()
    expect(screen.getByText('Em Progresso')).toBeDefined()
    expect(screen.getByText('Concluído')).toBeDefined()
  })

  it('deve marcar chips ativos com aria-pressed', () => {
    render(
      <StatusFilter
        selected={['todo']}
        onChange={() => {}}
      />
    )
    expect(screen.getByLabelText('Filtrar A Fazer').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByLabelText('Filtrar Em Progresso').getAttribute('aria-pressed')).toBe('false')
  })

  it('deve chamar onChange ao clicar em um chip', async () => {
    const user = userEvent.setup()
    let result: TaskStatus[] = []
    render(
      <StatusFilter
        selected={['todo', 'in-progress', 'done']}
        onChange={(s) => { result = s }}
      />
    )
    await user.click(screen.getByLabelText('Filtrar A Fazer'))
    expect(result).toEqual(['in-progress', 'done'])
  })
})
