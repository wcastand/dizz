import React, { useState, useCallback, useEffect } from 'react'
import { patch_obj } from 'diff-match-patch'
import { Transition } from 'react-transition-group'
import { ThemeProvider } from 'styled-components'

import { useShortcut, diff, add, rm } from './utils'
import theme, { GlobalStyle } from './theme'
import { Diff, Container, Btn, BtnGroup, Area, Wrapper } from './styles'

const r = `import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import * as serviceWorker from './serviceWorker'

import 'isomorphic-unfetch'

ReactDOM.render(<Root />, document.body)
serviceWorker.unregister()`

const t = `import React from 'react'
import ReactDOM from 'react-dom'
import SueprApp from './SueprApp'
import * as serviceWorker from './sw'

ReactDOM.render(<SueprApp />, document.body)
serviceWorker.unregister()`

const App: React.FC = () => {
  const [animate, setAnimate] = useState(false)
  const [show, setShow] = useState(false)
  const [from, setF] = useState(r)
  const [to, setT] = useState(t)
  const [d, setD] = useState<patch_obj[]>([])

  const toggleDiff = () => {
    setShow(!show)
    doAnimate()
  }
  const getDiff = useCallback(async () => {
    setD(diff(from, to))
  }, [from, to])

  const doAnimate = useCallback(() => {
    setAnimate(!show)
  }, [show])

  useEffect(() => {
    getDiff()
  }, [from, getDiff])
  useShortcut({ key: 70 }, toggleDiff) // f
  console.log(d)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <BtnGroup>
          <Btn active={show} onClick={toggleDiff}>
            {show ? 'Hide diff' : 'Show diff'}
          </Btn>
        </BtnGroup>
        <Wrapper>
          <Container>
            <Area
              onChange={e => setF(e.target.value)}
              value={from}
              placeholder='Enter your original text...'
            />
            <Area
              onChange={e => setT(e.target.value)}
              value={to}
              placeholder='Enter your changed text...'
            />
          </Container>
          <Transition
            in={animate}
            timeout={{ exit: 300, enter: 0, appear: 300 }}
            unmountOnExit
            mountOnEnter>
            {state => (
              <Container state={state}>
                <Diff>{rm(from, d)}</Diff>
                <Diff>{add(to, d)}</Diff>
              </Container>
            )}
          </Transition>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default App
