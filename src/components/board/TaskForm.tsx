import { useState, type FormEvent } from 'react'
import type { Task, TaskStatus } from '../../types'
import { STATUS_LABELS, STATUS_ORDER } from '../../constants/status'
import { validateTitle, validateDescription } from '../../utils/taskUtils'
import { Modal } from '../ui/Modal'

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string, status: TaskStatus) => void
  initialTask?: Task
  submitLabel: string
}

export function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
  submitLabel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(initialTask?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? 'todo')

  const titleError = validateTitle(title)
  const descriptionError = validateDescription(description)
  const isValid = titleError === null && descriptionError === null && title.trim().length > 0

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onSubmit(title.trim(), description.trim(), status)
    if (!initialTask) {
      setTitle('')
      setDescription('')
      setStatus('todo')
    }
    onClose()
  }

  function handleClose() {
    setTitle(initialTask?.title ?? '')
    setDescription(initialTask?.description ?? '')
    setStatus(initialTask?.status ?? 'todo')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={initialTask ? 'Editar Tarefa' : 'Nova Tarefa'}>
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-slate-300 mb-1">
              Título
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:ring-2 transition-colors duration-200 ${
                titleError && title.length > 0
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              placeholder="Título da tarefa"
              autoFocus
            />
            {titleError && title.length > 0 && (
              <p className="text-red-400 text-xs mt-1">{titleError}</p>
            )}
          </div>

          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-slate-300 mb-1">
              Descrição
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:ring-2 transition-colors duration-200 min-h-[100px] resize-y ${
                descriptionError
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              placeholder="Descrição da tarefa (opcional)"
              rows={3}
            />
            {descriptionError && (
              <p className="text-red-400 text-xs mt-1">{descriptionError}</p>
            )}
          </div>

          {initialTask && (
            <div>
              <label htmlFor="task-status" className="block text-sm font-medium text-slate-300 mb-1">
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  )
}
