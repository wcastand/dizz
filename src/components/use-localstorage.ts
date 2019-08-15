import { useState, useEffect } from 'react'

export type ValueType = string | null

const useLocalStorage = (
  key: string,
  defaultValue: ValueType = null,
): [ValueType, (value: string) => void] => {
  const [v, setV] = useState<ValueType>(defaultValue)
  useEffect(() => {
    if (window && window.localStorage) setV(window.localStorage.getItem(key))
  }, [key, v])
  const setValue = (value: string) => {
    if (window && window.localStorage) window.localStorage.setItem(key, value)
    setV(value)
  }
  return [v, setValue]
}

export default useLocalStorage
