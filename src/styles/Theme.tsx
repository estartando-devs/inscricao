import { DefaultTheme } from 'styled-components'

const Theme: DefaultTheme = {
  shadows: ["0px 4px 4px rgba(0, 0, 0, 0.25)"],
  palette: {
    type: "dark",
    primary: {
      light: "#81E7A8",
      main: "#81CAA8",
      dark: "#488184",
      contrastText: "#525252"
    },
    secondary: {
      light: "#2E3B80",
      main: "#666666",
      dark: "#3B3B3B",
      contrastText: "#fff"
    },
    text: {
      primary: "#fff",
      secondary: "#fcfcfc",
      disable: "#fbfbfb",
    },
    background: {
      paper: "#666666",
      default: "#3B3B3B",
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    }
  },
  margin: {
    small: "8px",
    regular: "12px",
    large: "16px",
  },
  typography: {
    fontFamily: "Open Sans",
    htmlFontSize: "16px",
  },
};

export default Theme;
