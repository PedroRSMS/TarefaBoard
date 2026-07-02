import { useState, type FormEvent } from 'react'
import type { BoardColumn, ColumnColor } from '../../types'
import { COLUMN_COLOR_DOT, COLUMN_COLOR_LABELS } from '../../constants/status'
import { Modal } from '../ui/Modal'

const COLOR_OPTIONS: ColumnColor[] = ['blue', 'amber', 'green', 'red', 'purple', 'pink', 'cyan', 'orange']

interface ColumnFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, color: ColumnColor) => void
  initialColumn?: BoardColumn
}

export function ColumnForm({ isOpen, onClose, onSubmit, initialColumn }: ColumnFormProps) {
  const [title, setTitle] = useState(initialColumn?.title ?? '')
  const [color, setColor] = useState<ColumnColor>(initialColumn?.color ?? 'blue')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (trimmed.length === 0) return
    onSubmit(trimmed, color)
    if (!initialColumn) {
      setTitle('')
      setColor('blue')
    }
    onClose()
  }

  function handleClose() {
    setTitle(initialColumn?.title ?? '')
    setColor(initialColumn?.color ?? 'blue')
    onClose()
  }

  const isEditing = !!initialColumn

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEditing ? 'Editar Coluna' : 'Nova Coluna'}>
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="column-title" className="block text-sm font-medium text-slate-300 mb-1">
              Nome
            </label>
            <input
              id="column-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              placeholder="Nome da coluna"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cor
            </label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    color === c
                      ? 'border-slate-400 text-slate-200'
                      : 'border-slate-700 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${COLUMN_COLOR_DOT[c]}`} />
                  {COLUMN_COLOR_LABELS[c]}
                </button>
              ))}
            </div>
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
            disabled={title.trim().length === 0}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
