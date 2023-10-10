import React from 'react'
import { useDispatch } from 'react-redux'
import { getAlbum } from '../../redux/dataSlice';

const Album = ({ setWord, album }) => {
    const dispatch = useDispatch();
    const showAlbum = (id) => {
        dispatch(getAlbum(id));
        setWord('');
    }
    return (
        <div onClick={() => showAlbum(album.id)} className='bg-gray-800 opacity-80 p-2 w-[180px] rounded-lg shadow-2xl hover:bg-gray-700 cursor-pointer transition-all'>
            <img className='w-[140px] rounded-lg m-auto' src={album.images[0].url} alt="" />
            <h2 className='ms-2 mt-3 font-bold'>{album.name}</h2>
            <h4 className='ms-2 mt-2 text-gray-400'>{album?.artists[0]?.name}</h4>
        </div>
    )
}

export default Album