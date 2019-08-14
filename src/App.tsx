import React, { useState, useCallback, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { ThemeProvider } from 'styled-components'

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

const ff = `{ page: 2, per_page: 3, total: 12, total_pages: 4, data: [ { id: 4, email: 'eve.holt@reqres.in', first_name: 'Eve', last_name: 'Holt', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg' }, { id: 5, email: 'charles.morris@reqres.in', first_name: 'Charles', last_name: 'Morris', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg' }, { id: 6, email: 'tracey.ramos@reqres.in', first_name: 'Tracey', last_name: 'Ramos', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg' } ] }`
const tt = `{ page: 2, per_page: 2, total: 2, total_pages: 4, data: [ { id: 4, email: 'eve.holt@gmail.in', first_name: 'Eve', last_name: 'Holt', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg' }, { id: 5, email: 'charles.morris@reqres.in', first_name: 'Charles', last_name: 'Morris', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg' }, { id: 6, email: 'tracey.ramos@reqres.in', first_name: 'Tracey', last_name: 'Ramos', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg' } ] }`

const App: React.FC = () => {
  const [from, setF] = useState('')
  const [to, setT] = useState('')
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
              value={from}
              placeholder='Paste your original text here...'
            />
            <Area
              onChange={e => setT(e.target.value)}
              value={to}
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
