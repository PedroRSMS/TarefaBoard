import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deve retornar o valor inicial imediatamente', () => {
    const { result } = renderHook(() => useDebounce('teste', 300))
    expect(result.current).toBe('teste')
  })

  it('deve debounced o valor após o delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'inicial', delay: 300 } }
    )

    rerender({ value: 'atualizado', delay: 300 })
    expect(result.current).toBe('inicial')

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('atualizado')
  })

  it('deve cancelar o timer anterior em mudanças rápidas', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    )

    rerender({ value: 'ab', delay: 300 })
    rerender({ value: 'abc', delay: 300 })

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('abc')
  })
})
