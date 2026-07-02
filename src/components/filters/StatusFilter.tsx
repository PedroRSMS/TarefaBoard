import type { BoardColumn } from '../../types'
import { COLUMN_COLOR_CHIP } from '../../constants/status'
import { COLUMN_COLOR_DOT } from '../../constants/status'

interface StatusFilterProps {
  columns: BoardColumn[]
  selectedIds: string[]
  onChange: (selectedIds: string[]) => void
}

export function StatusFilter({ columns, selectedIds, onChange }: StatusFilterProps) {
  function toggleColumn(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((s) => s !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {columns.map((col) => {
        const isActive = selectedIds.includes(col.id)
        return (
          <button
            key={col.id}
            onClick={() => toggleColumn(col.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 flex items-center gap-1.5 ${
              isActive
                ? COLUMN_COLOR_CHIP[col.color]
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300'
            }`}
            aria-pressed={isActive}
            aria-label={`Filtrar ${col.title}`}
          >
            <span className={`w-2 h-2 rounded-full ${COLUMN_COLOR_DOT[col.color]}`} />
            {col.title}
          </button>
        )
      })}
    </div>
  )
}
