import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'

let theme = createMuiTheme({
  palette: {
    primary: {
      light: red[300],
      main: red[600],
      dark: red[700],
    },
    secondary: {
      light: grey[300],
      main: grey[800],
      dark: grey[900],
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    typography: {
      fontFamily: 'Roboto',
      // fontSize: 34,
      useNextVariants: true,
      htmlFontSize: 10,
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme