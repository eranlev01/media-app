import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    backgroundColor: '#1c1f27',
    borderBottom: '1px solid #000000',
    boxShadow: '0px 1px 5px black;',
    // boxShadow: 'inset 0 0 5px #000000',
    width: '85%',
    margin: '0 auto 30px',
    padding: theme.spacing(1),
    borderRadius: '20px',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Genres = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage
}) => {
  const classes = useStyles();

  const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setGenres(data.genres);
  }
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  }
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter(g => g.id !== genre.id))
    setPage(1)
  }

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line
  }, [])
  return (
    <Paper component="ul" className={classes.root}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
          className={classes.chip}
        />
      ))}
    </Paper>
  )
}

export default Genres;
