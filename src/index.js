import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { getSpotifyToken } from './utils'
import registerServiceWorker from './registerServiceWorker'

if (!getSpotifyToken()) {
	const redirectUri = window.location.protocol + '//' + window.location.host
	const scopes = [
		'playlist-read-collaborative',
		'streaming',
		'user-follow-read',
		'user-library-read',
		'user-read-currently-playing',
		'user-read-recently-played',
		'user-top-read',
	].join('%20')
	const clientId = 'e5f7ec54856e46e99b33e23b45a7f61c'
	const spotifyTokenRequestURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=123`
	window.location.href = spotifyTokenRequestURL
} else {
	ReactDOM.render(<App />, document.getElementById('root'))
}

registerServiceWorker()
