import { useState, useEffect } from 'react'

export type ValueType = string | null | boolean

const useLocalStorage = <T = any>(key: string, defaultValue: T = null): [T, (value: T) => void] => {
  const [v, setV] = useState<T>(defaultValue)
  useEffect(() => {
    if (window && window.localStorage) setV(JSON.parse(window.localStorage.getItem(key)))
  }, [key, v])
  const setValue = (value: T) => {
    if (window && window.localStorage) window.localStorage.setItem(key, JSON.stringify(value))
    setV(value)
  }
  return [v, setValue]
}

export default useLocalStorage
