import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import type { Task, BoardColumn, ColumnColor } from '../../types'
import { Column } from './Column'
import { TaskCard } from './TaskCard'
import { TaskForm } from './TaskForm'
import { ColumnForm } from './ColumnForm'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { ConfirmDeleteColumnModal } from './ConfirmDeleteColumnModal'

interface BoardProps {
  tasks: Task[]
  columns: BoardColumn[]
  selectedColumnIds: string[]
  onUpdateTask: (task: Task, changes: { title?: string; description?: string; columnId?: string }) => void
  onDeleteTask: (id: string) => void
  onAddColumn: (title: string, color: ColumnColor) => void
  onUpdateColumn: (column: BoardColumn) => void
  onDeleteColumn: (id: string) => void
}

export function Board({
  tasks,
  columns,
  selectedColumnIds,
  onUpdateTask,
  onDeleteTask,
  onAddColumn,
  onUpdateColumn,
  onDeleteColumn,
}: BoardProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isColumnFormOpen, setIsColumnFormOpen] = useState(false)
  const [editingColumn, setEditingColumn] = useState<BoardColumn | null>(null)
  const [deletingColumn, setDeletingColumn] = useState<BoardColumn | null>(null)

  const visibleColumns = columns.filter((c) => selectedColumnIds.includes(c.id))

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  function getTasksByColumn(columnId: string): Task[] {
    return tasks.filter((task) => task.columnId === columnId)
  }

  function handleUpdate(task: Task, title: string, description: string, columnId: string) {
    onUpdateTask(task, { title, description, columnId })
  }

  function handleDeleteConfirm() {
    if (deletingTask) {
      onDeleteTask(deletingTask.id)
      setDeletingTask(null)
    }
  }

  function handleDeleteColumnConfirm() {
    if (deletingColumn) {
      onDeleteColumn(deletingColumn.id)
      setDeletingColumn(null)
    }
  }

  function handleColumnSubmit(title: string, color: ColumnColor) {
    if (editingColumn) {
      onUpdateColumn({ ...editingColumn, title, color })
      setEditingColumn(null)
    } else {
      onAddColumn(title, color)
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null)
    const { active, over } = event

    if (!over) return

    const task = tasks.find((t) => t.id === active.id)
    if (!task) return

    const newColumnId = over.id as string
    if (newColumnId === task.columnId) return

    onUpdateTask(task, { columnId: newColumnId })
  }

  if (selectedColumnIds.length === 0) {
    return (
      <div className="flex-1 px-4 sm:px-8 py-4 sm:py-6 overflow-auto flex items-center justify-center">
        <p className="text-slate-400 text-lg">Selecione ao menos um status</p>
      </div>
    )
  }

  return (
    <div className="flex-1 px-4 sm:px-8 py-4 sm:py-6 overflow-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <p className="text-slate-400 text-lg">
                Nenhuma tarefa encontrada para os filtros atuais
              </p>
              <button
                onClick={() => setIsColumnFormOpen(true)}
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors duration-200"
              >
                + Nova Coluna
              </button>
            </div>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {visibleColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={getTasksByColumn(column.id)}
                onEdit={setEditingTask}
                onDelete={setDeletingTask}
                onEditColumn={setEditingColumn}
                onDeleteColumn={setDeletingColumn}
              />
            ))}
            <button
              onClick={() => setIsColumnFormOpen(true)}
              className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl min-h-[300px] hover:border-slate-500 hover:bg-slate-800/30 transition-colors duration-200"
            >
              <span className="text-slate-500 text-lg">+ Nova Coluna</span>
            </button>
          </div>
        )}

        <DragOverlay>
          {activeTask ? (
            <div className="opacity-80 rotate-2 scale-105">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
                isDragOverlay
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {editingTask && (
        <TaskForm
          isOpen={true}
          onClose={() => setEditingTask(null)}
          onSubmit={(title, description, columnId) =>
            handleUpdate(editingTask, title, description, columnId)
          }
          columns={columns}
          initialTask={editingTask}
          submitLabel="Salvar"
        />
      )}

      <ConfirmDeleteModal
        isOpen={deletingTask !== null}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteConfirm}
        taskTitle={deletingTask?.title ?? ''}
      />

      <ColumnForm
        isOpen={isColumnFormOpen}
        onClose={() => setIsColumnFormOpen(false)}
        onSubmit={handleColumnSubmit}
      />

      {editingColumn && (
        <ColumnForm
          isOpen={true}
          onClose={() => setEditingColumn(null)}
          onSubmit={handleColumnSubmit}
          initialColumn={editingColumn}
        />
      )}

      <ConfirmDeleteColumnModal
        isOpen={deletingColumn !== null}
        onClose={() => setDeletingColumn(null)}
        onConfirm={handleDeleteColumnConfirm}
        columnTitle={deletingColumn?.title ?? ''}
        taskCount={tasks.filter((t) => t.columnId === deletingColumn?.id).length}
      />
    </div>
  )
}
