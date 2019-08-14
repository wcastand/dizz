import styled from 'styled-components'
import { colorSwitch, color } from './theme'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const Container = styled.div<{ show?: boolean; state?: any }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${props => (props.show ? 'grid' : typeof props.show === 'undefined' ? 'grid' : 'none')};
  padding: 0 24px 24px 24px;
  border-radius: 8px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  transition: opacity 0.3s ease-in;
  opacity: ${({ state = 'entered' }) => (state === 'entered' ? 1 : 0)};
`

export const Diff = styled.pre`
  overflow-x: hidden;
  overflow-y: auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
  font-family: 'Inconsolata', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 16px;
  border-radius: 4px;
  color: ${color('b70')};
  border: 1px solid ${color('black')};
  background-color: ${color('black')};
`

export const Area = styled.textarea.attrs({ wrap: 'off' })`
  overflow-x: hidden;
  overflow-y: auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Inconsolata', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 16px;
  border-radius: 4px;
  color: ${color('white')};
  border: 1px solid ${color('b70')};
  background-color: ${color('black')};
`

export const BtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  margin: 0 auto;
`

export const Btn = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 8px 22px;
  margin: 0;
  font-weight: bold;
  color: ${colorSwitch('active', 'black', 'white')};
  background-color: ${colorSwitch('active', 'white', 'black')};
  border: 1px solid ${color('white')};
  border-radius: 4px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  &:hover {
    color: ${color('black')};
    background-color: ${color('white')};
  }
`

export const RM = styled.span`
  display: inline;
  border-radius: 2px;
  min-width: 1px;
  background-color: ${color('error.light')};
  color: ${color('white')};
`
export const ADDED = styled.span`
  display: inline;
  border-radius: 2px;
  min-width: 1px;
  background-color: ${color('success.light')};
  color: ${color('white')};
`

export const Title = styled.h1`
  margin: 0 24px;
  padding: 0;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.5;
`

export const Subtitle = styled.span`
  margin-left: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1.5;
  color: ${color('b40')};
`

export const NavBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SwitchContainer = styled.div`
  flex: 1;
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`

export const Helper = styled.i`
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 17px;
  text-align: center;
  border-radius: 100%;
  border: 1px solid ${color('white')};
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: 8px;
  color: ${color('white')};
  cursor: help;
`
