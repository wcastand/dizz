import { FC, useEffect, useMemo, useState } from 'react'
import { tw, apply } from 'twind'
import { diffWords, diffJson } from 'diff'

import useSwitch from '../components/use-switch'
import useDarkMode from '../components/use-darkmode'

const container = tw`h-screen flex flex-col bg-white text-gray-900 overflow-hidden dark:(bg-gray-900 text-white)`
const header = tw`grid grid-cols-1 md:(grid-cols-2) px-4 pt-4 items-start`
const editors = tw`h-full overflow-hidden flex-1 grid grid-cols-1 md:(grid-cols-2) p-4 gap-4`
const editor = tw`flex col-span-1 border border-gray-300 rounded p-2 text-base font-sans bg-white text-gray-900 dark:(border-gray-700 bg-gray-900 text-white)`
const board = tw`col-span-1 border border-gray-300 rounded p-2 text-base font-sans overflow-y-scroll dark:(border-gray-700)`

const title = tw`font-bold text-3xl text-left`
const subtitle = tw`text-base text-gray-500`

const switchContainer = tw`flex flex-row items-center px-0 md:px-4`

const base = apply`text-gray-300 text-base dark:(text-gray-700)`
const added = apply`text-green-500 dark:(text-green-500)`
const removed = apply`text-red-500 dark:(text-red-500)`
const switchlabel = apply`select-none cursor-pointer`

type SwitchProps = FC<{
  left: string
  right: string
  state: boolean
  toggle: (force?: boolean) => void
}>

const Switch: SwitchProps = ({ children, state, toggle, left, right }) => {
  return (
    <div className={switchContainer}>
      <span
        className={tw(switchlabel, `text-gray-${state ? '900' : '400'} dark:(text-gray-${state ? '100' : '400'})`)}
        onClick={() => toggle(true)}>
        {left}
      </span>
      {children}
      <span
        className={tw(switchlabel, `text-gray-${state ? '400' : '900'} dark:(text-gray-${state ? '400' : '100'})`)}
        onClick={() => toggle(false)}>
        {right}
      </span>
    </div>
  )
}

const LightIcon = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8 justify-self-end'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    {...props}>
    <g transform='scale(.6) translate(8,8)'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      />
    </g>
    <circle r={9} cx={12} cy={12} strokeWidth={2} />
  </svg>
)

function Home() {
  const [editText, setEditText] = useState('')
  const [diffText, setDiffText] = useState('')
  const [EditSwitch, editState, editToggle] = useSwitch()
  const [DiffSwitch, diffState, diffToggle] = useSwitch()
  const [, toggleDarkMode] = useDarkMode(true)

  const diff = useMemo(
    () => (diffState ? diffWords(editText, diffText) : diffJson(editText, diffText)),
    [editState, diffState, editText, diffText],
  )

  return (
    <div className={container}>
      <div className={header}>
        <h1 className={title}>
          DizzApp<span className={subtitle}>.dev</span>
        </h1>
        <div className={tw`flex flex-col md:flex-row justify-end md:items-center`}>
          <Switch left='Edit' right='Diff' state={editState} toggle={editToggle}>
            {EditSwitch}
          </Switch>
          <Switch left='String' right='JSON' state={diffState} toggle={diffToggle}>
            {DiffSwitch}
          </Switch>
          <LightIcon onClick={() => toggleDarkMode()} />
        </div>
      </div>
      <div className={editors}>
        {editState ? (
          <>
            <textarea
              className={editor}
              placeholder='original text...'
              value={editText}
              onChange={e => setEditText(e.target.value)}></textarea>
            <textarea className={editor} placeholder='new text...' value={diffText} onChange={e => setDiffText(e.target.value)}></textarea>
          </>
        ) : (
          <>
            <div className={board}>
              {diff.map(
                (part, idx) =>
                  !part.added && (
                    <span className={tw(base, part.removed && removed, { 'whitespace-pre': !diffState })} key={`original_${idx}`}>
                      {part.value}
                    </span>
                  ),
              )}
            </div>
            <div className={board}>
              {diff.map(
                (part, idx) =>
                  !part.removed && (
                    <span className={tw(base, part.added && added, { 'whitespace-pre': !diffState })} key={`diff_${idx}`}>
                      {part.value}
                    </span>
                  ),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
