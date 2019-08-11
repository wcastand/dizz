import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import { color, colorSwitch } from '../theme'

const Container = styled.div<{ align?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align }) => (align ? align : 'center;')};
  align-items: center;
  cursor: pointer;
  user-select: none;
`
const Switch = styled.div<{ state: string }>`
  position: relative;
  width: 20px;
  height: 10px;
  margin: 0 12px;
  border-radius: 10px;
  background-color: ${color('b60')};
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.2);
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: ${color('white')};
    transition: transform 200ms ease-out;
    transform: translateX(${({ state }) => (state === 'entered' ? 10 : 0)}px);
  }
`

const Label = styled.label<{ active: boolean }>`
  font-family: 'Inconsolata', monospace;
  font-size: 16px;
  line-height: 1.5;
  cursor: pointer;
  transition: color 0.2s 0.25s ease-out;
  color: ${colorSwitch('active', 'white', 'b40')};
`

const Toggle = ({ align, active, left, right, onClick }: Props) => {
  return (
    <Container onClick={onClick} align={align}>
      <Label active={!active}>{left}</Label>
      <Transition in={active} timeout={{ enter: 200, exit: 200 }}>
        {state => <Switch state={state} />}
      </Transition>
      <Label active={active}>{right}</Label>
    </Container>
  )
}

export type Props = {
  align?: string
  active: boolean
  onClick: () => void
  left: React.ReactNode
  right: React.ReactNode
}

export type defaultProps = {
  align?: string
  defaultState?: boolean
  left: React.ReactNode
  right: React.ReactNode
}

const useToggle = (props: defaultProps): [React.ReactNode, boolean, Function] => {
  const [active, setActive] = useState(props.defaultState ? props.defaultState : false)
  return [
    useMemo<React.ReactNode>(() => {
      const toggle = () => setActive(!active)
      return <Toggle {...props} active={active} onClick={toggle} />
    }, [active, props]),
    active,
    setActive,
  ]
}

export default useToggle
