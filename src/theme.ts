import idx from 'idx'
import get from 'lodash/fp/get'
import reset from 'styled-reset'
import { createGlobalStyle, DefaultTheme } from 'styled-components'

export type ColorKeys =
  | 'white'
  | 'b10'
  | 'b20'
  | 'b30'
  | 'b40'
  | 'b50'
  | 'b60'
  | 'b70'
  | 'b80'
  | 'black'
  | 'error.light'
  | 'error.default'
  | 'error.dark'
  | 'success.light'
  | 'success.default'
  | 'success.dark'
  | 'warning.light'
  | 'warning.default'
  | 'warning.dark'
  | 'yellow.light'
  | 'yellow.default'
  | 'yellow.dark'
  | 'highlight.alert'
  | 'highlight.purple'
  | 'highlight.cyan'

export const theme: DefaultTheme = {
  colors: {
    white: '#FFFFFF',
    b10: '#FAFAFA',
    b20: '#EFEFEF',
    b30: '#999999',
    b40: '#888888',
    b50: '#666666',
    b60: '#444444',
    b70: '#333333',
    b80: '#111111',
    black: '#000000',
    error: {
      light: '#FF3333',
      default: '#FF0000',
      dark: '#E60000',
    },
    success: {
      light: '#1A85FF',
      default: '#0076FF',
      dark: '#0366D6',
    },
    warning: {
      light: '#F7B955',
      default: '#F5A623',
      dark: '#F49B0B',
    },
    yellow: {
      light: '#FFFBE6',
      default: '#FFE58F',
      dark: '#FFDB66',
    },
    highlight: {
      alert: '#FF0080',
      purple: '#F81CE5',
      cyan: '#79FFE1',
    },
  },
}

export const props = (fn: (_: { theme: DefaultTheme }) => any) => (props: {
  theme: DefaultTheme
}) => idx(props, fn)

export const color = (color: ColorKeys) => (props: { theme: DefaultTheme }) =>
  get(color, props.theme.colors)

export const colorSwitch = (state: string, on: ColorKeys, off: ColorKeys) => (props: {
  theme: DefaultTheme
}) => color(get(state, props) ? on : off)

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * { box-sizing: border-box; }
  body{
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-row-gap: 0px;
    grid-column-gap: 0px;
    min-height: 100vh;

    color: ${color('white')};
    background-color: ${color('black')};
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
    line-height: 1.5;
  }
  #root {
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr;
    grid-row-gap: 24px;
    grid-column-gap: 24px;
    width: 100%;
  }

`

export default theme
