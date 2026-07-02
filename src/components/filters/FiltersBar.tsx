import { SearchBar } from './SearchBar'
import { StatusFilter } from './StatusFilter'
import type { TaskStatus } from '../../types'

interface FiltersBarProps {
  search: string
  onSearchChange: (value: string) => void
  selectedStatuses: TaskStatus[]
  onStatusesChange: (selected: TaskStatus[]) => void
}

export function FiltersBar({
  search,
  onSearchChange,
  selectedStatuses,
  onStatusesChange,
}: FiltersBarProps) {
  return (
    <div className="px-4 sm:px-8 py-4 border-b border-slate-700 bg-slate-800/30">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <SearchBar value={search} onChange={onSearchChange} />
        <StatusFilter selected={selectedStatuses} onChange={onStatusesChange} />
      </div>
    </div>
  )
}
