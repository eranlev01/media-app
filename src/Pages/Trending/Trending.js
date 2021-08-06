import React, { useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import './Trending.css'
const CustomPagination = React.lazy(() => import('../../Components/MainDashBoard/Pagination/CustomPagination'));
const ContentCard = React.lazy(() => import('../../Components/MainDashBoard/ContentCard/ContentCard'));

const Tranding = () => {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(null)

    let fetchTrending = async () => {

        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        setContent(data.results.sort((a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average)));
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <span className="page-title">Most Popular</span>
            <div className="trending">
                <Suspense fallback={'Loading.....'}>
                    {content && content.map((c) => <ContentCard
                        overview={c.overview}
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}
                    />)
                    }
                </Suspense>
            </div>
            {numOfPages > 1 &&
            <Suspense>
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            </Suspense>}
        </div>
    )
}

export default Tranding
