import React, { useState } from 'react'
import VideoPlayer from 'react-video-markers'
import AudioPlayer from 'react-h5-audio-player'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  videoContentArea: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  audioContentArea: {
    marginTop: '1rem'
  },

  '@media only screen and (max-width: 1200px)': {
    videoContentArea: {
      width: '100%'
    }
  }
}))
export default function Media (props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setvolume] = useState(0.7)
  const classes = useStyles()

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleVolume = value => {
    setvolume(value)
  }
  return (
    <div>
      {props.media && props.musicVideo ? (
        <div className={classes.videoContentArea}>
          <VideoPlayer
            width='100%'
            height='50vh'
            url={props.media}
            isPlaying={isPlaying}
            volume={volume}
            onPlay={handlePlay}
            onPause={handlePause}
            onVolume={handleVolume}
          />
        </div>
      ) : null}
      {props.media === 'audio' ? (
        <div className={classes.audioContentArea}>
          <AudioPlayer
            src={props.audioSource}
            onPlay={e => console.log('onPlay')}
          />
        </div>
      ) : null}
    </div>
  )
}
