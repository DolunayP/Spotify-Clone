import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from '../spotify'
import axios from 'axios'

const token = getToken().access_token;

const initialState = {
    user: [],
    playlists: [],
    weeklyList: null,
    severalArtists: [],
    newAlbums: [],
    albums: null,
    track: null,
    topTracks: null,
    artist: null,
    artistAlbums: null,
    searchedThings: null,
    recentlyPlayed: null,
}

export const apiClient = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    timeout: 5000,
});

apiClient.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    console.log(error);
})

export const getDataAfterLogin = createAsyncThunk('user', async () => {
    const res = await apiClient.get('me')
    const data = await res.data;
    console.log(data)
    return data
})

export const getPlaylist = createAsyncThunk('playlist', async (userId) => {
    try {
        const res = await apiClient.get(`users/${userId}/playlists`, {})
        const data = await res.data;
        return data;

    } catch (error) {
        return error.response.data;
    }
})

export const getWeekly = createAsyncThunk('weekly', async (playlistId) => {
    try {
        if (playlistId) {
            const res = await apiClient.get(`playlists/${playlistId}`, {})
            const data = await res.data;
            return data;
        } else {
            return null
        }
    } catch (error) {
        return error.response.data
    }
})

export const getSeveralArtists = createAsyncThunk('severalartist', async () => {
    try {
        const res = await apiClient.get(`artists?ids=6IFL211nZF4xuxG0u8G6HH,2Fu5huGG8iXC85P9akyYrr,5sWHDYs0csV6RS48xBl0tH,3yzGegJHrOW1CndMVFoo3m,6tRmpYzDIjWoRHzbJO7Cpx,28Qbi9jTj2eej21P2mImZI`)
        const data = await res.data;
        return data;
    } catch (error) {
        return error.response.data
    }
})

export const getArtist = createAsyncThunk('artist', async (id) => {
    try {
        if (id) {
            const res = await apiClient.get(`artists/${id}`)
            const data = await res.data;
            return data;
        } else {
            return null
        }


    } catch (error) {
        return error.response.data;
    }
})

export const getArtistsTopTracks = createAsyncThunk('toptrack', async (id) => {
    const res = await apiClient.get(`artists/${id}/top-tracks?country=TR`)
    const data = await res.data;
    return data;
})

export const getArtistsAlbums = createAsyncThunk('artistalbums', async (id) => {
    const res = await apiClient.get(`artists/${id}/albums?limit=8`)
    const data = await res.data;
    return data;
})

export const getNewAlbums = createAsyncThunk('newalbums', async () => {
    const res = await apiClient.get(`browse/new-releases?limit=10&country=TR`)
    const data = await res.data;
    return data;
})

export const getAlbum = createAsyncThunk('album', async (id) => {
    try {
        if (id) {
            const res = await apiClient.get(`albums/${id}`)
            const data = await res.data;
            return data;
        } else {
            return null
        }

    } catch (error) {
        return error.response.data;
    }
})

export const getTrack = createAsyncThunk('track', async (id) => {
    const res = await apiClient.get(`tracks/${id}`)
    const data = await res.data;
    return data;
})

export const getSearch = createAsyncThunk('search', async (word) => {
    try {
        const res = await apiClient.get(`search?q=${word}&type=artist,album,track,playlist&limit=5`)
        const data = await res.data;
        return data;
    } catch (error) {
        return error.response.data
    }
})

export const getRecentlyPlayed = createAsyncThunk('recently', async () => {
    const res = await apiClient.get(`me/player/recently-played`)
    const data = await res.data;
    return data;
})

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(getDataAfterLogin.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getPlaylist.fulfilled, (state, action) => {
                state.playlists = action.payload;
            })
            .addCase(getWeekly.fulfilled, (state, action) => {
                state.weeklyList = action.payload;
            })
            .addCase(getSeveralArtists.fulfilled, (state, action) => {
                state.severalArtists = action.payload;
            })
            .addCase(getArtist.fulfilled, (state, action) => {
                state.artist = action.payload;
            })
            .addCase(getArtistsTopTracks.fulfilled, (state, action) => {
                state.topTracks = action.payload;
            })
            .addCase(getArtistsAlbums.fulfilled, (state, action) => {
                state.artistAlbums = action.payload;
            })
            .addCase(getNewAlbums.fulfilled, (state, action) => {
                state.newAlbums = action.payload;
            })
            .addCase(getAlbum.fulfilled, (state, action) => {
                state.albums = action.payload;
            })
            .addCase(getTrack.fulfilled, (state, action) => {
                state.track = action.payload;
            })
            .addCase(getSearch.fulfilled, (state, action) => {
                state.searchedThings = action.payload;
            })
            .addCase(getRecentlyPlayed.fulfilled, (state, action) => {
                state.recentlyPlayed = action.payload;
            })

    }
})

export default dataSlice.reducer