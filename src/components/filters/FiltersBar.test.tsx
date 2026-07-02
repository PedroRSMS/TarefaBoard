import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useState } from 'react'
import { FiltersBar } from './FiltersBar'
import type { BoardColumn } from '../../types'

const mockColumns: BoardColumn[] = [
  { id: 'col-todo', title: 'A Fazer', color: 'blue' },
]

function TestFiltersBar() {
  const [search, setSearch] = useState('')
  const [ids, setIds] = useState<string[]>(['col-todo'])
  const [tagId, setTagId] = useState('')
  return (
    <FiltersBar
      search={search}
      onSearchChange={setSearch}
      columns={mockColumns}
      selectedColumnIds={ids}
      onColumnIdsChange={setIds}
      selectedTagId={tagId}
      onTagIdChange={setTagId}
    />
  )
}

describe('FiltersBar', () => {
  it('deve renderizar barra de busca e chips', () => {
    render(<TestFiltersBar />)
    expect(screen.getByPlaceholderText('Buscar tarefas...')).toBeDefined()
    expect(screen.getByText('A Fazer')).toBeDefined()
  })

  it('deve permitir digitar na busca', async () => {
    const user = userEvent.setup()
    render(<TestFiltersBar />)
    const input = screen.getByPlaceholderText('Buscar tarefas...') as HTMLInputElement
    await user.type(input, 'teste')
    expect(input.value).toBe('teste')
  })
})
