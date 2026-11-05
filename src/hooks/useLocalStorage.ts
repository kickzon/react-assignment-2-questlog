import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)

    if (storedValue === null) {
      return initialValue
    }

    try {
      return JSON.parse(storedValue) as T
    } catch {
      return initialValue
    }
  })

  function updateValue(newValue: T) {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, updateValue] as const
}
