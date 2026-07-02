import type { TaskTag, TagColor } from '../types'

export const TAGS: TaskTag[] = [
  { id: 'tag-bug', label: 'Bug', color: 'red' },
  { id: 'tag-feature', label: 'Feature', color: 'green' },
  { id: 'tag-improvement', label: 'Melhoria', color: 'blue' },
  { id: 'tag-urgent', label: 'Urgente', color: 'orange' },
  { id: 'tag-docs', label: 'Docs', color: 'purple' },
  { id: 'tag-design', label: 'Design', color: 'pink' },
]

export const TAG_COLOR_DOT: Record<TagColor, string> = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
}

export const TAG_COLOR_CHIP: Record<TagColor, string> = {
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

export function getTagById(id: string): TaskTag | undefined {
  return TAGS.find((t) => t.id === id)
}
