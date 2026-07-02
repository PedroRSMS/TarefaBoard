import { SearchBar } from './SearchBar'
import { StatusFilter } from './StatusFilter'
import { TagFilter } from './TagFilter'
import type { BoardColumn } from '../../types'

interface FiltersBarProps {
  search: string
  onSearchChange: (value: string) => void
  columns: BoardColumn[]
  selectedColumnIds: string[]
  onColumnIdsChange: (selected: string[]) => void
  selectedTagId: string
  onTagIdChange: (tagId: string) => void
}

export function FiltersBar({
  search,
  onSearchChange,
  columns,
  selectedColumnIds,
  onColumnIdsChange,
  selectedTagId,
  onTagIdChange,
}: FiltersBarProps) {
  return (
    <div className="px-4 sm:px-8 py-4 border-b border-slate-700 bg-slate-800/30">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <SearchBar value={search} onChange={onSearchChange} />
          <TagFilter selectedId={selectedTagId} onChange={onTagIdChange} />
        </div>
        <StatusFilter columns={columns} selectedIds={selectedColumnIds} onChange={onColumnIdsChange} />
      </div>
    </div>
  )
}
