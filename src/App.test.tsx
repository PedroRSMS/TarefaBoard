import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { App } from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve renderizar o header com logo', () => {
    render(<App />)
    expect(screen.getByText('TarefaBoard')).toBeDefined()
  })

  it('deve renderizar o botão Nova Tarefa', () => {
    render(<App />)
    expect(screen.getByText('Nova Tarefa')).toBeDefined()
  })

  it('deve renderizar a barra de busca', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Buscar tarefas...')).toBeDefined()
  })

  it('deve renderizar os chips de filtro com colunas padrão', () => {
    render(<App />)
    expect(screen.getByText('A Fazer')).toBeDefined()
    expect(screen.getByText('Em Progresso')).toBeDefined()
    expect(screen.getByText('Concluido')).toBeDefined()
  })

  it('deve mostrar estado vazio', () => {
    render(<App />)
    expect(
      screen.getByText('Nenhuma tarefa encontrada para os filtros atuais')
    ).toBeDefined()
  })

  it('deve abrir modal ao clicar em Nova Tarefa', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Nova Tarefa'))
    const elements = screen.getAllByText('Nova Tarefa')
    expect(elements.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('Criar')).toBeDefined()
  })

  it('deve criar uma tarefa e exibi-la no board', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('Nova Tarefa'))
    await user.type(screen.getByLabelText('Título'), 'Minha Primeira Tarefa')
    await user.click(screen.getByText('Criar'))

    expect(screen.getByText('Minha Primeira Tarefa')).toBeDefined()
  })

  it('deve mostrar botão Nova Coluna', () => {
    render(<App />)
    expect(screen.getByText('+ Nova Coluna')).toBeDefined()
  })
})
