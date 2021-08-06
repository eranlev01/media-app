import React, { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import './TvSeries.css'
import useGenres from '../../Hooks/useGenre'
const CustomPagination = React.lazy(() => import('../../Components/MainDashBoard/Pagination/CustomPagination'));
const Genres = React.lazy(() => import('../../Components/MainDashBoard/Genres/Genres'));
const ContentCard = React.lazy(() => import('../../Components/MainDashBoard/ContentCard/ContentCard'));

const TvSeries = () => {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);
    const cardFallback = '<div></div>'
    const fetchTvSeries = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };
    useEffect(() => {
        window.scroll(0, 0);
        fetchTvSeries();
        // eslint-disable-next-line
    }, [page, genreforURL]);

    return (
        <>
            <span className="page-title">TV Series</span>
            <Suspense className="genresSuspense">
                <Genres
                    type="tv"
                    genres={genres}
                    setGenres={setGenres}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    setPage={setPage} />
            </Suspense>
            <div className="tv-series">
                <Suspense fallback={cardFallback}>
                    {
                        content && content.map((c) =>
                            <ContentCard
                                overview={c.overview}
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type="tv"
                                vote_average={c.vote_average}
                            />
                        )
                    }
                </Suspense>
            </div>
            {numOfPages > 1 && (
                <Suspense>
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                </Suspense>
            )}
        </>
    )
}

export default TvSeries
