import React, { useEffect, useCallback } from 'react'
import { diff_match_patch } from 'diff-match-patch'
import { RM, ADDED } from './styles'

const dmp = new diff_match_patch()
export const diff = (from: string | null, to: string | null): [number, string][] => {
  if (!from || !to) return []
  const diffs = dmp.diff_main(from, to)
  dmp.diff_cleanupSemantic(diffs)
  return diffs
}

export const add = (d: [number, string][]) =>
  d.map(([s, str], idx) => {
    switch (s) {
      case 1:
        return <ADDED key={`diff_${idx}`}>{str}</ADDED>
      case -1:
        if ((d[idx - 1] && d[idx - 1][0] !== 1) || (d[idx + 1] && d[idx + 1][0] !== 1))
          return (
            <RM key={`diff_${idx}`} title={str}>
              {' '}
            </RM>
          )
        return null
      case 0:
      default:
        return str
    }
  })
export const rm = (d: [number, string][]) =>
  d.map(([s, str], idx) => {
    switch (s) {
      case 1:
        if ((d[idx - 1] && d[idx - 1][0] !== -1) || (d[idx + 1] && d[idx + 1][0] !== -1))
          return (
            <ADDED key={`diff_${idx}`} title={str}>
              {' '}
            </ADDED>
          )
        return null
      case -1:
        return <RM key={`diff_${idx}`}>{str}</RM>
      case 0:
      default:
        return str
    }
  })

const defaultKeys = {
  ctrl: false,
  alt: false,
  shift: false,
  meta: false,
  key: -1,
}

function throttle(fn: Function, wait: number) {
  var time = Date.now()
  return function(...rest: any[]) {
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
