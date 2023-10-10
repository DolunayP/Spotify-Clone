import React, { useEffect } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';
import { getArtist, getArtistsAlbums, getArtistsTopTracks, getNewAlbums, getSeveralArtists } from '../../redux/dataSlice';
import { Artist } from './Artist';
import Album from './Album';
import AlbumSongs from './AlbumSongs';

export const Body = ({ word, setWord }) => {
    const { searchedThings, weeklyList, severalArtists, albums, newAlbums, topTracks, artist, artistAlbums } = useSelector(state => state.data)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSeveralArtists())
        dispatch(getNewAlbums())

    }, [dispatch])

    const showArtist = (id) => {
        dispatch(getArtist(id))
        dispatch(getArtistsTopTracks(id))
        dispatch(getArtistsAlbums(id))
        setWord('')
    }

    console.log(searchedThings)

    return (
        <div className='flex-[0.8] h-screen text-white p-4 overflow-scroll body-player pb-[80px]'>
            <Header word={word} setWord={setWord} />
            {!searchedThings?.error && searchedThings !== null ?
                <>
                    <div className='flex'>
                        <div onClick={() => showArtist(searchedThings?.artists?.items[0]?.id)} className='flex-[0.4] cursor-pointer ms-2 p-4 box-border rounded-lg bg-gray-950 hover:bg-gray-800 transition-all'>
                            <h2 className='text-2xl font-bold mb-4'>En Çok Dinlenen Sanatçı</h2>
                            <div>
                                <img className='rounded-full shadow-lg w-[120px] h-[120px]' src={searchedThings?.artists?.items[0]?.images[0]?.url} alt="" />
                                <h2 className='ms-2 text-3xl font-bold'>{searchedThings?.artists?.items[0]?.name}</h2>
                                <p className='ms-2 text-gray-400'>Şarkıcı</p>
                            </div>
                        </div>
                        <div className='flex-[0.6] cursor-pointer ms-2 p-4 box-border rounded-lg bg-gray-950 hover:bg-gray-800 transition-all'>
                            <h2 className='text-2xl font-bold mb-4'>Şarkılar</h2>
                            <div>
                                {searchedThings?.tracks?.items?.map((item, i) => {
                                    return (<SongRow key={i} track={item} index={i + 1} />)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <h2 className='text-2xl font-bold my-6'>Albümler</h2>
                        <div className='flex gap-5 flex-wrap'>
                            {searchedThings?.albums?.items?.map(album => {
                                return <Album setWord={setWord} key={album.id} album={album} />
                            })}
                        </div>                    </div>
                </>
                : !weeklyList?.error && weeklyList !== null ?
                    <>
                        <div className='flex items-end gap-3 p-2'>
                            <img className='h-[20vw] shadow-xl' src={weeklyList?.images ? weeklyList.images[0].url : ''} alt="" />
                            <div className='flex-1'>
                                <strong>PLAYLIST</strong>
                                <h2 className='text-4xl font-bold mb-2'>{weeklyList?.name}</h2>
                                <p className='text-sm'>{weeklyList?.description}</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-4 ms-3 my-4 !text-2xl'>
                                <PlayCircleIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                <FavoriteBorderIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                <MoreHorizIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                            </div>
                            <div className='px-6 flex text-xl text-gray-500 py-2 border-b-[1px] border-gray-700'>
                                <div className='flex-[0.05] justify-start'>#</div>
                                <div className='flex-[0.75] justify-start'>Başlık</div>
                                <div className='flex-[0.2] justify-end'>Süre</div>
                            </div>
                            {weeklyList?.tracks?.items.map((item, i) => {
                                return (<SongRow key={i} track={item.track} index={i + 1} />)
                            })}
                        </div>
                    </>
                    : !albums?.error && albums !== null ?
                        <>
                            <div className='flex items-end gap-3 p-2'>
                                <img className='h-[20vw] shadow-2xl' src={albums?.images ? albums.images[0].url : ''} alt="" />
                                <div className='flex-1 ms-3'>
                                    <p className='text-sm capitalize mb-4'>{albums?.type}</p>
                                    <h2 className='text-5xl font-bold mb-4'>{albums?.name}</h2>
                                    <div className='flex'>
                                        {albums?.artists?.map(artist => artist.name).join(", ")} - {albums?.total_tracks} Şarkı - {albums?.release_date}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex items-center gap-4 ms-3 my-4 !text-2xl'>
                                    <PlayCircleIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                    <FavoriteBorderIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                    <MoreHorizIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                </div>
                                <div className='px-6 flex text-xl text-gray-500 py-2 border-b-[1px] border-gray-700'>
                                    <div className='flex-[0.05] justify-start'>#</div>
                                    <div className='flex-[0.75] justify-start'>Başlık</div>
                                    <div className='flex-[0.2] justify-end'>Süre</div>
                                </div>
                                {albums?.tracks?.items?.map((item, i) => {
                                    return (<AlbumSongs key={i} track={item} index={i + 1} />)
                                })}
                            </div>
                        </>
                        : !artist?.error && artist !== null ?
                            <>
                                <div className='flex items-end gap-3 p-2'>
                                    <img className='h-[20vw] shadow-xl rounded-full' src={artist?.images ? artist.images[0].url : ''} alt="" />
                                    <div className='flex-1'>
                                        <p className='text-sm capitalize my-2'>Aylık {artist?.followers?.total.toLocaleString('en-US')} Dinleyici</p>
                                        <h2 className='text-4xl font-bold mb-2'>{artist?.name}</h2>
                                        <div className='flex'>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center gap-4 ms-3 my-4 !text-2xl'>
                                        <PlayCircleIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                        <FavoriteBorderIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                        <MoreHorizIcon fontSize='large' className='cursor-pointer hover:scale-125 !transition-all' />
                                    </div>
                                    <div>
                                        <h2 className='text-2xl font-bold ms-4'>Popüler Şarkılar</h2>
                                    </div>
                                    <div className='px-6 flex text-xl text-gray-500 py-2 border-b-[1px] border-gray-700'>
                                        <div className='flex-[0.05] justify-start'>#</div>
                                        <div className='flex-[0.75] justify-start'>Başlık</div>
                                        <div className='flex-[0.2] justify-end'>Süre</div>
                                    </div>
                                    {topTracks?.tracks?.map((track, i) => {
                                        return <SongRow track={track} key={track.id} index={i + 1} />
                                    })}
                                    <div>
                                        <h2 className='text-2xl font-bold ms-4 my-6'>Sanatçının Albümleri</h2>
                                    </div>
                                    <div className='flex gap-5 flex-wrap ms-4'>
                                        {artistAlbums?.items?.map(album => {
                                            return <Album setWord={setWord} key={album.id} album={album} />
                                        })}
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <h2 className='text-2xl font-bold mb-4'>En Çok Dinlenen Sanatçılar</h2>
                                <div className='flex gap-4 flex-wrap'>
                                    {severalArtists?.artists?.map(artist => {
                                        return <Artist key={artist.id} artist={artist} />
                                    })}
                                </div>


                                <h2 className='text-2xl font-bold my-6'>Yeni Çıkan Albümler</h2>
                                <div className='flex gap-5 flex-wrap'>
                                    {newAlbums?.albums?.items?.map(album => {
                                        return <Album setWord={setWord} key={album.id} album={album} />
                                    })}
                                </div>
                            </>
            }
        </div >
    )
}
