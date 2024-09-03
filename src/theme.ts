import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A2A72',
    },
    secondary: {
      main: '#4E4E8F',
    },
    background: {
      default: '#e4e4f7',
      paper: '#e4e4f7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
