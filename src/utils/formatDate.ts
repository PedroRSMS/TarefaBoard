import { format, parseISO, isPast, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'dd/MM/yyyy', { locale: ptBR })
  } catch {
    return isoString
  }
}

export function getDueDateStatus(
  dueDate?: string
): 'overdue' | 'today' | 'upcoming' | null {
  if (!dueDate) return null
  try {
    const date = parseISO(dueDate)
    if (isPast(date) && !isToday(date)) return 'overdue'
    if (isToday(date)) return 'today'
    return 'upcoming'
  } catch {
    return null
  }
}

export function formatDueDate(dueDate?: string): string | null {
  if (!dueDate) return null
  try {
    return format(parseISO(dueDate), 'dd/MM/yyyy', { locale: ptBR })
  } catch {
    return dueDate
  }
}
