import 'styled-components'

declare module "styled-components" {
  export interface DefaultTheme {
    shadows: string[],
    palette: {
      type: string,
      primary: {
        main: string,
        error: string,
        highlight: string,
        disable: string,
      },
      secondary: {
        main: string,
      },
      text: {
        primary: string,
        secondary: string,
        disable: string,
      },
      background: {
        paper: string,
        default: string,
      },
    },
    margin: {
      small: string,
      regular: string,
      large: string,
    },
    typography: {
      fontFamily: string,
      htmlFontSize: string,
    },
  }
}