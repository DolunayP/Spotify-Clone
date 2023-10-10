import React from 'react'
import { useDispatch } from 'react-redux'
import { getArtist, getArtistsAlbums, getArtistsTopTracks } from '../../redux/dataSlice';

export const Artist = ({ artist }) => {
    const dispatch = useDispatch();
    const showArtist = (id) => {
        dispatch(getArtist(id))
        dispatch(getArtistsTopTracks(id))
        dispatch(getArtistsAlbums(id))
    }

    return (
        <div onClick={() => showArtist(artist.id)} className='flex items-center bg-gray-800 opacity-80 min-w-[300px] cursor-pointer shadow-xl rounded-lg hover:bg-gray-600 transition-all'>
            <img className='rounded-md shadow-lg w-[80px] h-[80px]' src={artist.images[2].url} alt="" />
            <h2 className='text-lg ms-3 font-bold'>{artist.name}</h2>
        </div>)
}
