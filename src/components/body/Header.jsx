import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylist, getSearch } from '../../redux/dataSlice';

const Header = ({ word, setWord }) => {
    const { user } = useSelector(state => state.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPlaylist(user.id))
        window.location.hash = ''
    }, [user])

    useEffect(() => {
        dispatch(getSearch(word))

    }, [word])


    return (
        <div className='flex justify-between mb-7'>
            <div className='bg-white flex-[0.5] min-w-[80px] text-gray-500 rounded-3xl flex items-center p-2'>
                <SearchIcon />
                <input value={word} onChange={e => setWord(e.target.value)} className='border-0 text-lg font-bold w-full outline-none bg-transparent' type="text" placeholder='Search for Artists, Songs, Albums ...' />
                <div onClick={() => setWord('')} className='font-extrabold cursor-pointer p-1 text-lg'>X</div>
            </div>
            <div className='flex items-center'>
                <Avatar src={user?.images ? user.images[0].url : ''} />
                <h4 className='ms-2'>{user.display_name}</h4>
            </div>
        </div>
    )
}

export default Header