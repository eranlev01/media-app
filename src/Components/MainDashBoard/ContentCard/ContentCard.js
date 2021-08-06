import React from 'react'
import { img_300, unavailable } from '../../../Config/config'
import './ContentCard.css'
import Badge from '@material-ui/core/Badge';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import useWindowSize from '../../../Hooks/useWindowSize'
const ContentModal = React.lazy(() => import('../ContentModal/ContentModal'))


const ContentCard = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
    overview
}) => {
    const size = useWindowSize()
    return (
        <>
        {size.width > 500 ?
                <ContentModal media_type={media_type} id={id}>
                    <Badge badgeContent={vote_average} color={vote_average > 7 ? 'primary' : 'error'} />
                    <LazyLoadImage height="100%" width="100%" effect="blur" className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
                    <b className="title">{title}</b>
                    <span className="subTitle">
                        {media_type === 'tv' ? 'TV Series' : 'Movie'}
                        <span>{date}</span>
                    </span>
                </ContentModal> :
                <ContentModal media_type={media_type} id={id}>
                    <Badge badgeContent={vote_average} color={vote_average > 7 ? 'primary' : 'error'} />
                    <LazyLoadImage height="100%" width="100%" effect="blur" className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
                    <div className="mobile-titles-div">
                        <b className="title">{title}</b>
                        <div className="overview">{overview}</div>
                        <span className="subTitle">
                            {media_type === 'tv' ? 'TV Series' : 'Movie'}
                            <span>{date}</span>
                        </span>
                    </div>
                </ContentModal>
            }
        </>
    )
}

export default ContentCard

