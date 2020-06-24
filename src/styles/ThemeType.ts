import 'styled-components'
import {
  IColor,
  IText,
  ITypography,
  IMargin,
  IZindex,
  IAction,
  IShape,
} from './interfaces';

declare module "styled-components" {
  export interface DefaultTheme {
    shadows: string[],
    palette: {
      type: string,
      primary: IColor,
      secondary: IColor,
      text: IText,
      background: {
        paper: string,
        default: string,
      },
      action: IAction
    },
    margin: IMargin,
    typography: ITypography,
    zIndex: IZindex,
    shape: IShape
  }
}