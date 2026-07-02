import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        return JSON.parse(item) as T
      }
      return initialValue
    } catch (error) {
      console.warn(
        `Erro ao ler a chave "${key}" do localStorage:`,
        error
      )
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(
        `Erro ao salvar a chave "${key}" no localStorage:`,
        error
      )
    }
  }, [key, storedValue])

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value
        return nextValue
      })
    },
    []
  )

  return [storedValue, setValue]
}
