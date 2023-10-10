const authEndpoint = "https://accounts.spotify.com/authorize"

const redirectUri = "https://spotifyclonedolunay.netlify.app"

const scopes = [
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "playlist-read-private",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-library-modify",
    "user-library-read",
];

export const getToken = () => {
    return window.location.hash
        .substring(1).split('&').reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial;
        }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`