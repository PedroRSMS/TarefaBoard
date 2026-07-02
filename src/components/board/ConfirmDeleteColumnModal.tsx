import { Modal } from '../ui/Modal'

interface ConfirmDeleteColumnModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  columnTitle: string
  taskCount: number
}

export function ConfirmDeleteColumnModal({
  isOpen,
  onClose,
  onConfirm,
  columnTitle,
  taskCount,
}: ConfirmDeleteColumnModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Excluir Coluna">
      <div className="px-6 py-4 space-y-2">
        <p className="text-slate-300">
          Tem certeza que deseja excluir a coluna &ldquo;{columnTitle}&rdquo;?
        </p>
        {taskCount > 0 && (
          <p className="text-red-400 text-sm">
            {taskCount} tarefa{taskCount > 1 ? 's' : ''} será{taskCount > 1 ? 'o' : ''} excluída{taskCount > 1 ? 's' : ''}.
          </p>
        )}
      </div>
      <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Excluir
        </button>
      </div>
    </Modal>
  )
}
