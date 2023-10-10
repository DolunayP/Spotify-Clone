import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTrack } from '../../redux/dataSlice'

const SongRow = ({ track, index }) => {
    const dispatch = useDispatch()

    const playTrack = (id) => {
        dispatch(getTrack(id))
    }
    return (
        <div onClick={() => playTrack(track.id)} className='flex items-center ms-2 p-2 text-white rounded-lg cursor-pointer hover:bg-black hover:opacity-80'>
            <div className='text-lg text-gray-400 font-bold flex-[0.05] ms-2'>{index}</div>
            <div className='flex-[0.75] flex items-center'>
                <img className='h-10 w-10' src={track.album.images[0].url} alt="" />
                <div className='ms-4'>
                    <h1 className='text-lg'>{track.name}</h1>
                    <p className='text-sm text-gray-400 mt-1'>
                        {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                        {track.album.name}
                    </p>
                </div>
            </div>
            <div className='flex-[0.2] justify-start'>
                {Math.floor((track?.duration_ms / 60000)).toFixed(0)}:{(track?.duration_ms % 60000 / 1000).toFixed(0).toString().padStart(2, '0')}
            </div>
        </div>
    )
}

export default SongRow