import { useState, useMemo, useCallback } from 'react'
import { TaskProvider } from './components/TaskProvider'
import { useTaskContext } from './hooks/useTaskContext'
import { useDebounce } from './hooks/useDebounce'
import { LayoutDashboard } from 'lucide-react'
import { Board } from './components/board/Board'
import { TaskForm } from './components/board/TaskForm'
import { FiltersBar } from './components/filters/FiltersBar'

function AppContent() {
  const {
    tasks,
    columns,
    addTask,
    updateTask,
    deleteTask,
    reorderTask,
    addColumn,
    updateColumn,
    deleteColumn,
  } = useTaskContext()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedColumnIds, setSelectedColumnIds] = useState<string[]>(
    () => columns.map((c) => c.id)
  )
  const [selectedTagId, setSelectedTagId] = useState<string>('')

  const debouncedSearch = useDebounce(search, 300)

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesColumn = selectedColumnIds.includes(task.columnId)
        if (!matchesColumn) return false

        if (selectedTagId && task.tagId !== selectedTagId) return false

        if (debouncedSearch.trim() === '') return true

        return task.title.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
      })
      .sort((a, b) => a.order - b.order)
  }, [tasks, selectedColumnIds, selectedTagId, debouncedSearch])

  const handleCreate = useCallback(
    (title: string, description: string, columnId: string, tagId: string | undefined, dueDate: string | undefined) => {
      addTask(title, description, columnId, tagId, dueDate)
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

      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        columns={columns}
        selectedColumnIds={selectedColumnIds}
        onColumnIdsChange={setSelectedColumnIds}
        selectedTagId={selectedTagId}
        onTagIdChange={setSelectedTagId}
      />

      <Board
        tasks={filteredTasks}
        columns={columns}
        selectedColumnIds={selectedColumnIds}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onReorderTask={reorderTask}
        onAddColumn={addColumn}
        onUpdateColumn={updateColumn}
        onDeleteColumn={deleteColumn}
      />

      <TaskForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        columns={columns}
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
