import React from 'react'
import { useDispatch } from 'react-redux'
import { getWeekly } from '../../redux/dataSlice';

const Playlists = ({ setWord, type, image, title, id }) => {
    const dispatch = useDispatch();
    const changePlaylist = (id) => {
        dispatch(getWeekly(id));
        setWord('');
    }
    return (
        <div onClick={() => changePlaylist(id)} className='flex w-100 items-center justify-start gap-2 mb-2 py-2 cursor-pointer hover:bg-gray-800 hover:opacity-90 truncate rounded-lg transition-all'>
            <img className='h-8 w-8' src={image[0]?.url} alt="" />
            <div className='w-[110%]'>
                <div className='text-gray-400 w-[90%] truncate'> {title}</div >
                <p className='capitalize text-gray-400'>{type}</p>
            </div>
        </div>
    )
}

export default Playlists