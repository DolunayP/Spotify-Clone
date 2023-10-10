import React, { useEffect, useState } from 'react'
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { useSelector, useDispatch } from 'react-redux'
import { getRecentlyPlayed } from '../../redux/dataSlice';
import Sound from 'react-sound'

const Footer = () => {
  const { track, recentlyPlayed } = useSelector(state => state.data)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecentlyPlayed())
  }, [dispatch])

  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const [volume, setVolume] = useState(40);
  const [isPlaying, setIsPlaying] = useState(false)

  const playSound = () => {
    setPlayStatus(Sound.status.PLAYING);
    setIsPlaying(true)
  }

  const pauseSound = () => {
    setPlayStatus(Sound.status.PAUSED);
    setIsPlaying(false)
  }

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
  }

  return (
    <div className='flex justify-between items-center fixed bottom-0 left-0 p-4 h-[65px] w-full bg-black'>
      <Sound
        url={track ? track?.preview_url : recentlyPlayed ? recentlyPlayed?.items[0]?.track?.preview_url : ''}
        playStatus={playStatus}
        volume={volume}
      />
      {track ?
        <div className='flex flex-[0.3] gap-3 items-center max-w-[300px]'>
          <div className='w-[60px]'>
            <img className='w-full h-auto object-contain' src={track?.album?.images[1]?.url} alt="" />
          </div>
          <div>
            <h2>{track?.name}</h2>
            <p className='text-xs text-gray-400'>{track?.artists?.map(artist => artist.name).join(", ")}</p>
          </div>
        </div>
        :
        <div className='flex flex-[0.3] gap-3 items-center max-w-[300px]'>
          <div className='w-[60px]'>
            <img className='w-full h-auto object-contain' src={recentlyPlayed?.items[0]?.track?.album?.images[0].url} alt="" />
          </div>
          <div>
            <h2>{recentlyPlayed?.items[0]?.track?.name}</h2>
            <p className='text-xs text-gray-400'>{recentlyPlayed?.items[0]?.track?.artists?.map(artist => artist.name).join(", ")}</p>
          </div>
        </div>
      }


      <div className='flex gap-4 flex-[0.4] py-[100px] text-white items-center justify-center max-w-[300px]'>
        <ShuffleIcon className='cursor-pointer !text-yellow-500 hover:scale-125 !transition-all' fontSize='medium' />
        <SkipPreviousIcon  className='cursor-pointer hover:scale-125 !transition-all' />

        {!isPlaying ? < PlayCircleIcon onClick={playSound} className='cursor-pointer hover:scale-125 !transition-all' /> : <StopCircleIcon onClick={pauseSound} className='cursor-pointer hover:scale-125 !transition-all' />}

        <SkipNextIcon className='cursor-pointer hover:scale-125 !transition-all' />
        <RepeatIcon className='cursor-pointer !text-yellow-500 hover:scale-125 !transition-all' />
      </div>
      <div className='flex flex-[0.3] items-center justify-center gap-3'>
        <PlaylistPlayIcon className='cursor-pointer hover:scale-125 !transition-all' />
        <VolumeDownIcon />
        <input type='range' onChange={handleVolumeChange} min="0" max="100" value={volume} className='!w-[50%] bg-yellow-500' aria-label="Volume" size="small" />
        <VolumeUpIcon />
      </div>
    </div>
  )
}

export default Footer