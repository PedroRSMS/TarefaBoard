import { useState, useCallback } from 'react'
import { LayoutDashboard } from 'lucide-react'
import { TaskProvider } from './components/TaskProvider'
import { useTaskContext } from './hooks/useTaskContext'
import { Board } from './components/board/Board'
import { TaskForm } from './components/board/TaskForm'

function AppContent() {
  const { addTask } = useTaskContext()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreate = useCallback(
    (title: string, description: string) => {
      addTask(title, description)
    },
    [addTask]
  )

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-slate-700 bg-slate-800/50 shadow-sm">
        <div className="flex items-center gap-2">
          <LayoutDashboard size={24} className="text-indigo-400" />
          <h1 className="text-xl sm:text-3xl font-bold text-slate-50">TarefaBoard</h1>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Nova Tarefa
        </button>
      </header>

      <Board />

      <TaskForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        submitLabel="Criar"
      />
    </div>
  )
}

export function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  )
}
