import { useEffect, useCallback } from 'react'

const defaultKeys = {
  ctrl: false,
  alt: false,
  shift: false,
  meta: false,
  key: -1,
}

function throttle(fn: Function, wait: number) {
  var time = Date.now()
  return function (...rest: any[]) {
    if (time + wait - Date.now() < 0) {
      fn(...rest)
      time = Date.now()
    }
  }
}

export const useShortcut = (
  keys: {
    ctrl?: boolean
    alt?: boolean
    shift?: boolean
    meta?: boolean
    key: number
  } = defaultKeys,
  fn: Function,
) => {
  const k = { ...defaultKeys, ...keys }
  const check = useCallback(
    throttle((e: KeyboardEvent) => {
      if (
        ((k.ctrl && e.ctrlKey) ||
          (k.shift && e.shiftKey) ||
          (k.alt && e.altKey) ||
          (k.meta && e.metaKey) ||
          (!k.ctrl && !k.shift && !k.alt && !k.meta)) &&
        k.key === e.which
      )
        fn()
    }, 500),
    [fn, k],
  )
  useEffect(() => {
    document.addEventListener('keyup', check)
    return () => document.removeEventListener('keyup', check)
  }, [check])
}
