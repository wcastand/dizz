import React, { useRef } from 'react'
import styled from 'styled-components'

import { color } from '../theme'

export type HelpModalProps = {
  show: boolean
  toggleHelp: (show: boolean) => void
}

const ModalOverlay = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0
  height: 100vh;
  width: 100vw;
  display:flex;
  justify-content: center;
  align-items:center;
  background-color: transparent;
  transform: translateY(${(props: { show: boolean }) => (props.show ? '0vh' : '100vh')});
  transition: all .2s ease-in;
  cursor:alias;
`

const Modal = styled.p`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
  padding: 25px;
  font-family: 'Inconsolata', monospace;
  font-size: 16px;
  line-height: 1.5;
  background-color: ${color('b70')};
  color: ${color('white')};
  cursor: default;
  h3 {
    font-size: 1.4rem;
    padding-bottom: 12px;
  }
`

const HelpModal = (props: HelpModalProps) => {
  const modalRef = useRef(null)
  const handler:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined = event => {
    if (modalRef && modalRef.current && event.target !== modalRef.current) props.toggleHelp(false)
  }
  return (
    <ModalOverlay show={props.show} onClick={handler}>
      <Modal ref={modalRef}>
        <h3>Shortcuts</h3>
        Toggle the diff panels: `f` or `ctrl + f`
        <br />
        Toggle the help panel: `?`
      </Modal>
    </ModalOverlay>
  )
}

export default HelpModal
