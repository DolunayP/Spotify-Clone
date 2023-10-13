import React from 'react'
import SidebarOptions from './SidebarOptions'

const SideBar = ({ word, setWord }) => {

    return (
        <div className='flex-[0.2] px-4 h-screen border-1 min-w-[220px] bg-black text-white '>
            <div className=' mt-4 w-[75px] m-auto cursor-pointer'>
                <img className="w-full h-full" src="./assets/music-note.png" alt="" />
            </div>

            <SidebarOptions word={word} setWord={setWord} />
        </div>
    )
}

export default SideBar