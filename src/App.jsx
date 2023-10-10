import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { getToken } from './spotify'
import Player from './pages/Player'
import { getDataAfterLogin, getPlaylist, getWeekly } from './redux/dataSlice'
import { useDispatch } from 'react-redux'

function App() {
  const [token, setToken] = useState(null)

  const dispatch = useDispatch();
  useEffect(() => {
    const _token = getToken().access_token;
    if (_token) {
      setToken(_token)
      dispatch(getDataAfterLogin());
      dispatch(getPlaylist());
      // window.location.hash = ''
    }
  }, [dispatch])

  return (
    <>
      {
        token ? <Player /> : <Login />
      }

    </>
  )
}

export default App
