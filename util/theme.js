import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';


// Create a theme instance.
const theme = createMuiTheme({
  typography:{
    body1: {
        fontSize: "1.2rem",
        lineHeight: '1.45',
        fontWeight: 300,
    },
    h2: {
        fontWeight: 600,
        fontSize: "3.6rem",
        lineHeight: '1.1',
        letterSpacing: '-.5px'
        //fontSize: "5rem"
    },
    h3: {
        fontWeight: 600,
        fontSize: "2.8rem",
        letterSpacing: '-.5px'
    },
    h4: {
        fontWeight: 0,
        fontSize: "1.5rem",
        letterSpacing: '-.5px'
    },
    h5: {
        fontWeight: 400,
        fontSize: "1.5rem",
        letterSpacing: '-.5px'
    },
    h6: {
        fontWeight: 500,
        fontSize: ".9rem"
    }
},
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  colors: {
    blue: '#003087',
    white: '#fff',
    whiteOff: '#A3C7D2',
    black: '#0c2340',
    grey: '#a9abac',
    green: '#33cc33',
    red: '#FF0000',
    greyLight: '#f7f7f7'
} 
});

export default theme;