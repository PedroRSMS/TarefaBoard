import { format, parseISO, isPast, isToday, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(isoString: string): string {
  const date = parseISO(isoString)
  if (!isValid(date)) return isoString
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export function getDueDateStatus(
  dueDate?: string
): 'overdue' | 'today' | 'upcoming' | null {
  if (!dueDate) return null
  const date = parseISO(dueDate)
  if (!isValid(date)) return null
  if (isPast(date) && !isToday(date)) return 'overdue'
  if (isToday(date)) return 'today'
  return 'upcoming'
}

export function formatDueDate(dueDate?: string): string | null {
  if (!dueDate) return null
  const date = parseISO(dueDate)
  if (!isValid(date)) return dueDate
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}
