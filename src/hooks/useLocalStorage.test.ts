import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

const TEST_KEY = 'test-key'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('deve inicializar com initialValue quando a chave não existe', () => {
    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, 'default')
    )
    expect(result.current[0]).toBe('default')
  })

  it('deve carregar valor existente do localStorage', () => {
    localStorage.setItem(TEST_KEY, JSON.stringify('stored'))
    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, 'default')
    )
    expect(result.current[0]).toBe('stored')
  })

  it('deve persistir o valor no localStorage ao atualizar', () => {
    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, 'default')
    )
    act(() => {
      result.current[1]('updated')
    })
    expect(result.current[0]).toBe('updated')
    expect(JSON.parse(localStorage.getItem(TEST_KEY)!)).toBe('updated')
  })

  it('deve lidar com JSON malformado', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    localStorage.setItem(TEST_KEY, '{invalid-json')
    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, 'default')
    )
    expect(result.current[0]).toBe('default')
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })

  it('deve aceitar função como setter', () => {
    const { result } = renderHook(() =>
      useLocalStorage<number>(TEST_KEY, 0)
    )
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    expect(result.current[0]).toBe(1)
  })
})
