import { TAGS, TAG_COLOR_CHIP, TAG_COLOR_DOT } from '../../constants/tags'

interface TagFilterProps {
  selectedId: string
  onChange: (tagId: string) => void
}

export function TagFilter({ selectedId, onChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
          selectedId === ''
            ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
            : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300'
        }`}
        aria-pressed={selectedId === ''}
        aria-label="Sem filtro de etiqueta"
      >
        Todas
      </button>
      {TAGS.map((tag) => {
        const isActive = selectedId === tag.id
        return (
          <button
            key={tag.id}
            onClick={() => onChange(isActive ? '' : tag.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 flex items-center gap-1.5 ${
              isActive
                ? TAG_COLOR_CHIP[tag.color]
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300'
            }`}
            aria-pressed={isActive}
            aria-label={`Filtrar ${tag.label}`}
          >
            <span className={`w-2 h-2 rounded-full ${TAG_COLOR_DOT[tag.color]}`} />
            {tag.label}
          </button>
        )
      })}
    </div>
  )
}
