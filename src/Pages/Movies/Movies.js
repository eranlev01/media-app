import React, { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import './Movies.css'
import useGenres from '../../Hooks/useGenre'
const CustomPagination = React.lazy(() => import('../../Components/MainDashBoard/Pagination/CustomPagination'));
const Genres = React.lazy(() => import('../../Components/MainDashBoard/Genres/Genres'));
const ContentCard = React.lazy(() => import('../../Components/MainDashBoard/ContentCard/ContentCard'));

const Movies = () => {

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <>
      <span className="page-title">Discover Movies</span>
      <Suspense fallback="" className="genresSuspense">
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      </Suspense>
      <div className="movies">
        <Suspense>
          {content &&
            content.map((c) => (
              <ContentCard
                overview={c.overview}
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type="movie"
                vote_average={c.vote_average}
              />
            ))}
        </Suspense>
      </div>
      {numOfPages > 1 && (
        <Suspense>
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        </Suspense>
      )}
    </>
  );
};

export default Movies
