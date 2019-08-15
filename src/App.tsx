import React, { useState, useCallback, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { ThemeProvider } from 'styled-components'

import useLocalStorage from './components/use-localstorage'
import useToggle from './components/use-toggle'
import HelpModal from './components/help-modal'
import { useShortcut, diff, add, rm } from './utils'
import theme, { GlobalStyle } from './theme'
import {
  Title,
  Subtitle,
  SwitchContainer,
  NavBar,
  Diff,
  Container,
  Area,
  Wrapper,
  Helper,
} from './styles'

const App: React.FC = () => {
  const [from, setF] = useLocalStorage('from', '')
  const [to, setT] = useLocalStorage('to', '')
  const [help, toggleHelp] = useState(false)
  const [d, setD] = useState<[number, string][]>([])
  const [Toggle, show, setShow] = useToggle({ left: 'Editor', right: 'Show diff' })
  const getDiff = useCallback(async () => {
    setD(diff(from, to))
  }, [from, to])

  useEffect(() => {
    getDiff()
  }, [from, getDiff])
  useShortcut({ key: 70 }, () => setShow(!show)) // f
  useShortcut({ key: 70, ctrl: true }, () => setShow(!show)) // f
  useShortcut({ key: 191 }, () => toggleHelp(!help)) // ? show help modal

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <HelpModal show={help} toggleHelp={toggleHelp} />
        <NavBar>
          <Title>
            Dizz<Subtitle>diff checker</Subtitle>
            <Helper onClick={() => toggleHelp(!help)}>?</Helper>
          </Title>
          <SwitchContainer>{Toggle}</SwitchContainer>
        </NavBar>
        <Wrapper>
          <Container show={!show}>
            <Area
              onChange={e => setF(e.target.value)}
              value={from || ''}
              placeholder='Paste your original text here...'
            />
            <Area
              onChange={e => setT(e.target.value)}
              value={to || ''}
              placeholder='Paste your diff text here...'
            />
          </Container>
          <Transition
            in={show}
            timeout={{ exit: 300, enter: 0, appear: 300 }}
            unmountOnExit
            mountOnEnter>
            {state => (
              <Container state={state}>
                <Diff>{rm(d)}</Diff>
                <Diff>{add(d)}</Diff>
              </Container>
            )}
          </Transition>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default App
