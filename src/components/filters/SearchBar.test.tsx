import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('deve renderizar o input de busca', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Buscar tarefas...')).toBeDefined()
  })

  it('deve exibir o valor atual', () => {
    render(<SearchBar value="teste" onChange={() => {}} />)
    const input = screen.getByPlaceholderText('Buscar tarefas...') as HTMLInputElement
    expect(input.value).toBe('teste')
  })

  it('deve chamar onChange ao digitar', async () => {
    const user = userEvent.setup()
    let value = ''
    render(
      <SearchBar
        value=""
        onChange={(v) => { value = v }}
      />
    )
    await user.type(screen.getByPlaceholderText('Buscar tarefas...'), 'a')
    expect(value).toBe('a')
  })
})
