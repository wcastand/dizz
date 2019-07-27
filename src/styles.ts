import styled from 'styled-components'
import { colorSwitch, color } from './theme'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const Container = styled.div<{ state?: any }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  padding: 24px;
  border-radius: 8px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  transition: opacity 0.3s ease-in;
  opacity: ${({ state = 'entered' }) => (state === 'entered' ? 1 : 0)};
`

export const Diff = styled.pre`
  overflow-x: auto;
  flex: 1;
  font-size: 14px;
  margin: 0;
  padding: 16px;
  color: ${color('b70')};
  border: 1px solid ${color('black')};
  background-color: ${color('black')};
`

export const Area = styled.textarea`
  font-family: 'Inconsolata', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 16px;
  border-radius: 4px;
  color: ${color('white')};
  border: 1px solid ${color('b70')};
  border: none;
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
  padding: 2px 0;
  border-radius: 2px;
  background-color: ${color('b70')};
  color: ${color('error.dark')};
`
export const ADDED = styled.span`
  padding: 2px 0;
  border-radius: 2px;
  background-color: ${color('b70')};
  color: ${color('success.light')};
`
