import { describe, it, expect } from 'vitest'
import { format, addDays, subDays, startOfDay } from 'date-fns'
import { formatDate, getDueDateStatus, formatDueDate } from './formatDate'

function toISODate(date: Date): string {
  return format(startOfDay(date), 'yyyy-MM-dd')
}

describe('formatDate', () => {
  it('deve formatar data ISO para dd/MM/yyyy', () => {
    expect(formatDate('2024-01-15T10:30:00.000Z')).toBe('15/01/2024')
  })

  it('deve retornar o valor original para data inválida', () => {
    expect(formatDate('invalido')).toBe('invalido')
  })
})

describe('getDueDateStatus', () => {
  it('deve retornar null quando não há dueDate', () => {
    expect(getDueDateStatus()).toBeNull()
    expect(getDueDateStatus('')).toBeNull()
  })

  it('deve retornar overdue para datas passadas', () => {
    const past = toISODate(subDays(new Date(), 1))
    expect(getDueDateStatus(past)).toBe('overdue')
  })

  it('deve retornar today para data atual', () => {
    const today = toISODate(new Date())
    expect(getDueDateStatus(today)).toBe('today')
  })

  it('deve retornar upcoming para datas futuras', () => {
    const future = toISODate(addDays(new Date(), 1))
    expect(getDueDateStatus(future)).toBe('upcoming')
  })

  it('deve retornar null para data inválida', () => {
    expect(getDueDateStatus('invalido')).toBeNull()
  })
})

describe('formatDueDate', () => {
  it('deve retornar null quando não há dueDate', () => {
    expect(formatDueDate()).toBeNull()
    expect(formatDueDate('')).toBeNull()
  })

  it('deve formatar dueDate válido', () => {
    expect(formatDueDate('2024-01-15')).toBe('15/01/2024')
  })

  it('deve retornar o valor original para data inválida', () => {
    expect(formatDueDate('invalido')).toBe('invalido')
  })
})
