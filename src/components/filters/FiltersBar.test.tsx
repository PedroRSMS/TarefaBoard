import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useState } from 'react'
import { FiltersBar } from './FiltersBar'
import type { TaskStatus } from '../../types'

function TestFiltersBar() {
  const [search, setSearch] = useState('')
  const [statuses, setStatuses] = useState<TaskStatus[]>(['todo', 'in-progress', 'done'])
  return (
    <FiltersBar
      search={search}
      onSearchChange={setSearch}
      selectedStatuses={statuses}
      onStatusesChange={setStatuses}
    />
  )
}

describe('FiltersBar', () => {
  it('deve renderizar barra de busca e chips', () => {
    render(<TestFiltersBar />)
    expect(screen.getByPlaceholderText('Buscar tarefas...')).toBeDefined()
    expect(screen.getByText('A Fazer')).toBeDefined()
    expect(screen.getByText('Em Progresso')).toBeDefined()
    expect(screen.getByText('Concluído')).toBeDefined()
  })

  it('deve permitir digitar na busca', async () => {
    const user = userEvent.setup()
    render(<TestFiltersBar />)
    const input = screen.getByPlaceholderText('Buscar tarefas...') as HTMLInputElement
    await user.type(input, 'teste')
    expect(input.value).toBe('teste')
  })
})
