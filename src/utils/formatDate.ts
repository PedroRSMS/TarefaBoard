import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'dd/MM/yyyy', { locale: ptBR })
  } catch {
    return isoString
  }
}
