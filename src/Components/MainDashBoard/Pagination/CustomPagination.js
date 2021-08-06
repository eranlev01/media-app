import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
}));

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  const classes = useStyles();

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onChange={e => setPage(e.target.textContent)}
          color='primary'
          hideNextButton
          hidePrevButton />
      </ThemeProvider>
    </div>
  );
}