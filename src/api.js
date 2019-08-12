import {
	mapData,
	mapRecentlyPlayedData,
	transformAudioFeatures,
} from './mappers'
import { getSpotifyToken } from './utils'

export const getTracks = async () => {
	const tracksResponse = await fetch(
		'https://api.spotify.com/v1/me/tracks?limit=50',
		{
			headers: {
				Authorization: `Bearer ${getSpotifyToken()}`,
			},
		}
	)
	const tracks = await tracksResponse.json()

	return mapData(tracks)
}

export const getRecentlyPlayed = async () => {
	const tracksResponse = await fetch(
		'https://api.spotify.com/v1/me/player/recently-played?limit=50',
		{
			headers: {
				Authorization: `Bearer ${getSpotifyToken()}`,
			},
		}
	)
	const tracks = await tracksResponse.json()

	return mapRecentlyPlayedData(tracks)
}

export const getAudioFeatures = async () => {
	const tracksResponse = await fetch(
		'https://api.spotify.com/v1/me/tracks?limit=50',
		{
			headers: {
				Authorization: `Bearer ${getSpotifyToken()}`,
			},
		}
	)
	const tracks = await tracksResponse.json()

	const ids = tracks.items.map(item => item.track.id).join(',')

	const audioFeaturesResponse = await fetch(
		`https://api.spotify.com/v1/audio-features?ids=${ids}`,
		{
			headers: {
				Authorization: `Bearer ${getSpotifyToken()}`,
			},
		}
	)
	const audioFeatures = await audioFeaturesResponse.json()
	return transformAudioFeatures(audioFeatures, tracks)
}

export const playTrack = id => event => {
	event.preventDefault()

	fetch('https://api.spotify.com/v1/me/player/play', {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${getSpotifyToken()}`,
		},
		body: JSON.stringify({
			uris: [`spotify:track:${id}`],
		}),
	})
}

export const getNowPlaying = async () => {
	const response = await fetch(
		'https://api.spotify.com/v1/me/player/currently-playing',
		{
			headers: {
				Authorization: `Bearer ${getSpotifyToken()}`,
			},
		}
	)

	const {
		is_playing,
		item: { artists, name },
	} = await response.json()

	return {
		artist: artists && artists[0].name,
		trackName: name,
		isPlaying: is_playing,
	}
}
