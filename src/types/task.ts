export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  readonly id: string;
  title: string;
  description: string;
  status: TaskStatus;
  readonly createdAt: string;
  updatedAt: string;
}
