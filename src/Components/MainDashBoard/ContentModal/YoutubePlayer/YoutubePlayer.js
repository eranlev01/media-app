import React from 'react'
import YouTube from 'react-youtube';

const YoutubePlayer = ({ video }) => {

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
    },
  };

  const _onReady = (event) => {
    event.target.playVideo();
  }

  return (
    <div>
      <YouTube videoId={video} opts={opts} onReady={_onReady} className="youtube" />
    </div>
  )
}

export default YoutubePlayer
