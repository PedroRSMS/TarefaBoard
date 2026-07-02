import { Pencil, Trash2 } from 'lucide-react'
import type { Task } from '../../types'
import { formatDate } from '../../utils/formatDate'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div
      className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors duration-200 group shadow-sm"
      role="button"
      aria-roledescription="draggable"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-lg font-semibold text-slate-50 truncate">
          {task.title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors duration-200 focus:ring-2 focus:ring-indigo-500"
            aria-label="Editar tarefa"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors duration-200 focus:ring-2 focus:ring-indigo-500"
            aria-label="Excluir tarefa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-slate-400 line-clamp-3 mb-2">
          {task.description}
        </p>
      )}

      <p className="text-xs text-slate-500">
        Criado em {formatDate(task.createdAt)}
      </p>
    </div>
  )
}
