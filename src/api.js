import {
	mapData,
	mapRecentlyPlayedData,
	transformAudioFeatures,
} from './mappers'
import { getSpotifyToken } from './utils'

export const getTracks = async () => {
	const tracksResponse = await fetch('https://api.spotify.com/v1/me/tracks', {
		headers: {
			Authorization: `Bearer ${getSpotifyToken()}`,
		},
	})
	const tracks = await tracksResponse.json()

	return mapData(tracks)
}

export const getRecentlyPlayed = async () => {
	const tracksResponse = await fetch(
		'https://api.spotify.com/v1/me/player/recently-played',
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
	const tracksResponse = await fetch('https://api.spotify.com/v1/me/tracks', {
		headers: {
			Authorization: `Bearer ${getSpotifyToken()}`,
		},
	})
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
