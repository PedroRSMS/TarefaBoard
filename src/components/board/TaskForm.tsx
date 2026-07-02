import { useState, type FormEvent } from 'react'
import type { Task, BoardColumn } from '../../types'
import { validateTitle, validateDescription } from '../../utils/taskUtils'
import { Modal } from '../ui/Modal'

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string, columnId: string) => void
  columns: BoardColumn[]
  initialTask?: Task
  submitLabel: string
}

export function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  columns,
  initialTask,
  submitLabel,
}: TaskFormProps) {
  const defaultColumnId = initialTask?.columnId ?? columns[0]?.id ?? ''
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(initialTask?.description ?? '')
  const [columnId, setColumnId] = useState(defaultColumnId)

  const titleError = validateTitle(title)
  const descriptionError = validateDescription(description)
  const isValid = titleError === null && descriptionError === null && title.trim().length > 0

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onSubmit(title.trim(), description.trim(), columnId)
    if (!initialTask) {
      setTitle('')
      setDescription('')
      setColumnId(columns[0]?.id ?? '')
    }
    onClose()
  }

  function handleClose() {
    setTitle(initialTask?.title ?? '')
    setDescription(initialTask?.description ?? '')
    setColumnId(defaultColumnId)
    onClose()
  }

  const isEditing = !!initialTask

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}>
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

          <div>
            <label htmlFor="task-status" className="block text-sm font-medium text-slate-300 mb-1">
              Coluna
            </label>
            <select
              id="task-status"
              value={columnId}
              onChange={(e) => setColumnId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>
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
