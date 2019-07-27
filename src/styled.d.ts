// import original module declarations
import 'styled-components'

type Colors = {
  white: string
  b10: string
  b20: string
  b30: string
  b40: string
  b50: string
  b60: string
  b70: string
  b80: string
  black: string
  error: {
    light: string
    default: string
    dark: string
  }
  success: {
    light: string
    default: string
    dark: string
  }
  warning: {
    light: string
    default: string
    dark: string
  }
  yellow: {
    light: string
    default: string
    dark: string
  }
  highlight: {
    alert: string
    purple: string
    cyan: string
  }
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
  }
}
