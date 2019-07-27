import React, { useEffect, useCallback } from 'react'
import { diff_match_patch, patch_obj } from 'diff-match-patch'
import { RM, ADDED } from './styles'

const dmp = new diff_match_patch()
const parsedPatches = (nb: number, patches: patch_obj[]) =>
  patches.map(patch => {
    const filteredDiffs = patch.diffs.filter(([k, _]) => k !== nb)
    return {
      ...patch,
      search: filteredDiffs.reduce<string>((acc, [_, v]) => `${acc}${v}`, ''),
      diffs: filteredDiffs,
    }
  })

const hasChanges = (diffs: [number, string][]): boolean => diffs.some(([k, _]) => k !== 0)

export const diff = (from: string, to: string): patch_obj[] => dmp.patch_make(from, to)
export const rm = (from: string, patches: patch_obj[]): React.ReactNode[] => {
  return parsedPatches(1, patches).reduce<React.ReactNode[]>(
    (e, patch, i) => {
      console.log(patches)

      if (patch.diffs[1][1] && hasChanges(patch.diffs)) {
        const last: string = e.pop() as string
        const rest: React.ReactNode[] = e || []
        const [start, ...end] = last.split(patch.diffs[1][1])
        return [
          ...rest,
          start,
          <RM key={`urm_${i}`}>{patch.diffs[1][1]}</RM>,
          end.join(patch.diffs[1][1]),
        ]
      } else return e
    },
    [from],
  )
}
export const add = (to: string, patches: patch_obj[]): React.ReactNode[] => {
  return parsedPatches(-1, patches).reduce<React.ReactNode[]>(
    (e, patch, i) => {
      if (patch.diffs[1][1] && hasChanges(patch.diffs)) {
        const last: string = e.pop() as string
        const rest: React.ReactNode[] = e || []
        const [start, ...end] = last.split(patch.diffs[1][1])
        return [
          ...rest,
          start,
          <ADDED key={`urm_${i}`}>{patch.diffs[1][1]}</ADDED>,
          end.join(patch.diffs[1][1]),
        ]
      } else return e
    },
    [to],
  )
}

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
