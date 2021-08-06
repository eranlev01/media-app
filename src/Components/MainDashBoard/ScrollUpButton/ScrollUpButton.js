import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            position: 'fixed',
            bottom: '8%',
            right: '1%',
            width: '45px',
            height: '45px',
            [theme.breakpoints.down('sm')]: {
                width: '35px',
                height: '0',
            },
        },
    },
    arrow: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px',
        }
    },
}));

export default function ScrollUpBotton() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="add" onClick={() => window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })}>
                <ArrowUpwardIcon className={classes.arrow} />
            </Fab>
        </div>
    );
}