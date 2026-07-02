import type { TaskStatus } from '../../types'
import { STATUS_LABELS, STATUS_COLORS, STATUS_ORDER } from '../../constants/status'

interface StatusFilterProps {
  selected: TaskStatus[]
  onChange: (selected: TaskStatus[]) => void
}

export function StatusFilter({ selected, onChange }: StatusFilterProps) {
  function toggleStatus(status: TaskStatus) {
    if (selected.includes(status)) {
      onChange(selected.filter((s) => s !== status))
    } else {
      onChange([...selected, status])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_ORDER.map((status) => {
        const isActive = selected.includes(status)
        return (
          <button
            key={status}
            onClick={() => toggleStatus(status)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
              isActive
                ? STATUS_COLORS[status]
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300'
            }`}
            aria-pressed={isActive}
            aria-label={`Filtrar ${STATUS_LABELS[status]}`}
          >
            {STATUS_LABELS[status]}
          </button>
        )
      })}
    </div>
  )
}
