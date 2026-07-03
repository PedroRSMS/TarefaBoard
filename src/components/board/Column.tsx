import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Pencil, Trash2 } from 'lucide-react'
import type { Task, BoardColumn } from '../../types'
import { COLUMN_COLOR_DOT } from '../../constants/status'
import { TaskCard } from './TaskCard'

interface ColumnProps {
  column: BoardColumn
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onEditColumn: (column: BoardColumn) => void
  onDeleteColumn: (column: BoardColumn) => void
}

export function Column({ column, tasks, onEdit, onDelete, onEditColumn, onDeleteColumn }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  const taskIds = tasks.map((task) => task.id)

  return (
    <div className="flex flex-col bg-slate-800/50 border border-slate-700 rounded-xl min-h-[300px]">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2 group/col">
        <span className={`w-2.5 h-2.5 rounded-full ${COLUMN_COLOR_DOT[column.color]}`} />
        <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide flex-1">
          {column.title}
        </h2>
        <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
        <div className="flex gap-0.5 opacity-0 group-hover/col:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEditColumn(column)}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors duration-200"
            aria-label={`Editar coluna ${column.title}`}
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={() => onDeleteColumn(column)}
            className="text-slate-400 hover:text-red-400 p-0.5 rounded transition-colors duration-200"
            aria-label={`Excluir coluna ${column.title}`}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 p-3 space-y-3 transition-colors duration-200 rounded-b-xl ${
          isOver
            ? 'bg-indigo-500/10 border-2 border-dashed border-indigo-500/40'
            : ''
        }`}
      >
        {tasks.length === 0 && !isOver ? (
          <p className="text-sm text-slate-500 text-center py-8">
            Nenhuma tarefa neste status
          </p>
        ) : (
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </SortableContext>
        )}
        {isOver && tasks.length === 0 && (
          <p className="text-sm text-indigo-400 text-center py-8">
            Solte aqui para mover
          </p>
        )}
      </div>
    </div>
  )
}
