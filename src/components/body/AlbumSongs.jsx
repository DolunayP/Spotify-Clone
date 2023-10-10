import React from 'react'
import { useDispatch } from 'react-redux'
import { getTrack } from '../../redux/dataSlice'
const AlbumSongs = ({ track, index }) => {
    const dispatch = useDispatch()
    const playTrack = (id) => {
        dispatch(getTrack(id))
    }
    return (
        <div onClick={() => playTrack(track.id)} className='flex items-center ms-4 p-3 text-white rounded-lg cursor-pointer hover:bg-black hover:opacity-80'>
            <div className='text-lg text-gray-400 font-bold flex-[0.05]'>{index}</div>
            <div className='flex-[0.75]'>
                <h1 className='text-lg'>{track?.name}</h1>
                <p className='text-sm text-gray-400 mt-1'>
                    {track?.artists?.map((artist) => artist.name).join(", ")}
                </p>
            </div>
            <div className='flex-[0.2] justify-start'>
                {Math.floor((track?.duration_ms / 60000)).toFixed(0)}:{(track?.duration_ms % 60000 / 1000).toFixed(0).toString().padStart(2, '0')}
            </div>
        </div>
    )
}

export default AlbumSongs