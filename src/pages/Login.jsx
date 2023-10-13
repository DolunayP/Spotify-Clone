import React from 'react'
import { loginUrl } from '../spotify'

const Login = () => {


    return (
        <div className='bg-black flex flex-col items-center justify-center w-full h-screen'>
            <img className='w-[400px] mb-12' src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="" />
            <a href={loginUrl} className='rounded-lg p-4 bg-green-500 text-white'>Login With Spotify</a>
        </div>
    )
}

export default Login