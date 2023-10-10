import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import { useDispatch, useSelector } from 'react-redux';
import Playlists from './Playlists';
import { getAlbum, getArtist, getWeekly } from '../../redux/dataSlice';

const SidebarOptions = ({ word, setWord }) => {
    const { playlists } = useSelector(state => state.data)
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getWeekly(null));
        dispatch(getAlbum(null));
        dispatch(getArtist(null));
        setWord('');
    }

    return (
        <div className='text-gray-400 flex justify-center flex-col gap-5 mt-6'>
            <div onClick={handleClick} className='hover:text-white cursor-pointer transition-all flex gap-3'><HomeIcon /> Home</div>
            <div className='hover:text-white cursor-pointer transition-all flex gap-3'><SearchIcon /> Search</div>
            <div className='hover:text-white cursor-pointer transition-all flex gap-3'><LibraryMusicIcon /> Library</div>

            <h3 className='border-b-2 pb-2 border-gray-600'>PLAYLISTS</h3>
            <div className='h-[52vh] overflow-hidden hover:overflow-y-scroll'>
                {playlists?.items?.map((playlist, i) => {
                    return <Playlists setWord={setWord} key={i} type={playlist.type} image={playlist.images} title={playlist.name} id={playlist.id} />
                })}
            </div>
        </div>
    )
}

export default SidebarOptions