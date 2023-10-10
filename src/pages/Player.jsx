import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import SideBar from '../components/sidebar/SideBar'
import { Body } from '../components/body/Body'

const Player = () => {
  const [word, setWord] = useState('')

  return (
    <div>
      <div className='flex w-full'>
        <SideBar word={word} setWord={setWord} />
        <Body word={word} setWord={setWord} />
      </div>

      <Footer />
    </div>
  )
}

export default Player