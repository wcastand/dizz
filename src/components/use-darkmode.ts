import { useState, useEffect } from 'react'

import useLocalStorage from './use-localstorage'

const useDarkMode = (defaultValue: boolean = true): [boolean, (force?: boolean) => void] => {
  const [darkMode, setDarkState] = useLocalStorage('darkMode', defaultValue)
  const toggleDarkMode = (force?: boolean) => setDarkState(force ?? !darkMode)
  useEffect(() => {
    if (!darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  return [darkMode, toggleDarkMode]
}

export default useDarkMode
