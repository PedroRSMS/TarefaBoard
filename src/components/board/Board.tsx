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
import type { Task, TaskStatus } from '../../types'
import { STATUS_ORDER } from '../../constants/status'
import { useTaskContext } from '../../hooks/useTaskContext'
import { Column } from './Column'
import { TaskCard } from './TaskCard'
import { TaskForm } from './TaskForm'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'

export function Board() {
  const { tasks, updateTask, deleteTask } = useTaskContext()

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  function getTasksByStatus(status: TaskStatus): Task[] {
    return tasks.filter((task) => task.status === status)
  }

  function handleUpdate(task: Task, title: string, description: string, status: TaskStatus) {
    updateTask(task, { title, description, status })
  }

  function handleDeleteConfirm() {
    if (deletingTask) {
      deleteTask(deletingTask.id)
      setDeletingTask(null)
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

    const newStatus = over.id as TaskStatus
    if (newStatus === task.status) return

    updateTask(task, { status: newStatus })
  }

  return (
    <div className="flex-1 px-4 sm:px-8 py-4 sm:py-6 overflow-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-slate-400 text-lg mb-2">Nenhuma tarefa encontrada</p>
              <p className="text-slate-500 text-sm">
                Clique em &ldquo;Nova Tarefa&rdquo; para começar
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {STATUS_ORDER.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={getTasksByStatus(status)}
                onEdit={setEditingTask}
                onDelete={setDeletingTask}
              />
            ))}
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
          onSubmit={(title, description, status) =>
            handleUpdate(editingTask, title, description, status)
          }
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
    </div>
  )
}
