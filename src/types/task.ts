export type ColumnColor = 'blue' | 'amber' | 'green' | 'red' | 'purple' | 'pink' | 'cyan' | 'orange'

export interface BoardColumn {
  readonly id: string
  title: string
  color: ColumnColor
}

export interface Task {
  readonly id: string
  title: string
  description: string
  columnId: string
  readonly createdAt: string
  updatedAt: string
}
