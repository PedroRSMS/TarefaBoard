import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('deve formatar data ISO para dd/MM/yyyy', () => {
    expect(formatDate('2024-01-15T10:30:00.000Z')).toBe('15/01/2024')
  })

  it('deve retornar o valor original para data inválida', () => {
    expect(formatDate('invalido')).toBe('invalido')
  })
})
