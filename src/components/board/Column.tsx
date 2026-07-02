import type { Task, TaskStatus } from '../../types'
import { STATUS_LABELS, STATUS_DOT_COLORS } from '../../constants/status'
import { TaskCard } from './TaskCard'

interface ColumnProps {
  status: TaskStatus
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function Column({ status, tasks, onEdit, onDelete }: ColumnProps) {
  return (
    <div className="flex flex-col bg-slate-800/50 border border-slate-700 rounded-xl min-h-[300px]">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${STATUS_DOT_COLORS[status]}`} />
        <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
          {STATUS_LABELS[status]}
        </h2>
        <span className="ml-auto text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="flex-1 p-3 space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">
            Nenhuma tarefa neste status
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
