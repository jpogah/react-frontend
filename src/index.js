import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0336FF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      //light: '#0066ff',
      main: '#FFDE03',
      // dark: will be calculated from palette.secondary.main,
      //contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
