import { useState, useMemo } from 'react'
import { tw, apply } from 'twind'
import { css } from 'twind/css'

const bar = tw`inline-block relative w-6 h-3 mx-2 text-center focus-within:(ring-2 ring-gray-400 rounded-full) dark:focus-within:ring-gray-400`
const knobbase = apply`absolute top-0 left-0 w-6 h-3 rounded bg-white border border-gray-700 rounded-full dark:(bg-gray-900 border-gray-100)`
const knobcircle = apply`absolute w-3 h-3 rounded-full bg-gray-900 transition-transform dark:bg-gray-100`
const hidden = tw(
  `relative h-full w-full absolute top-0 left-0 border-none`,
  css`
    opacity: 0.0001;
  `,
)

function useSwitch(): [JSX.Element, boolean, (force?: boolean) => void] {
  const [state, setState] = useState(true)

  function toggle(force?: boolean) {
    setState(s => force ?? !s)
  }

  const Switch = useMemo(
    () => (
      <label className={tw(bar)}>
        <span className={tw(knobbase)} aria-hidden={state} />
        <span
          aria-hidden={state}
          className={tw(
            knobcircle,
            css`
              transform: translateX(${state ? '-.75rem' : '0rem'});
            `,
          )}
        />
        <input className={hidden} role='switch' type='checkbox' checked={state} onChange={() => toggle()} />
      </label>
    ),
    [state],
  )

  return [Switch, state, toggle]
}

export default useSwitch
