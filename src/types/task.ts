export type ColumnColor = 'blue' | 'amber' | 'green' | 'red' | 'purple' | 'pink' | 'cyan' | 'orange'

export type TagColor = 'red' | 'green' | 'blue' | 'orange' | 'purple' | 'pink'

export interface BoardColumn {
  readonly id: string
  title: string
  color: ColumnColor
}

export interface TaskTag {
  id: string
  label: string
  color: TagColor
}

export interface Task {
  readonly id: string
  title: string
  description: string
  columnId: string
  order: number
  readonly createdAt: string
  updatedAt: string
  tagId?: string
  dueDate?: string
}
