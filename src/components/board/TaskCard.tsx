import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Pencil, Trash2 } from 'lucide-react'
import type { Task } from '../../types'
import { formatDate } from '../../utils/formatDate'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  isDragOverlay?: boolean
}

export function TaskCard({ task, onEdit, onDelete, isDragOverlay }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    disabled: isDragOverlay,
  })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  const cardClassName = `bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors duration-200 group shadow-sm ${
    isDragging ? 'opacity-50' : ''
  } ${isDragOverlay ? 'cursor-grabbing shadow-xl' : 'cursor-grab'}`
  const activeClasses = isDragOverlay ? '' : 'active:cursor-grabbing'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${cardClassName} ${activeClasses}`}
      role="button"
      aria-roledescription="draggable"
      aria-describedby={`task-${task.id}-title`}
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          id={`task-${task.id}-title`}
          className="text-lg font-semibold text-slate-50 truncate"
        >
          {task.title}
        </h3>
        <div
          className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onPointerDown={(e) => e.stopPropagation()}
        >
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
