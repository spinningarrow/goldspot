import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { currentlyPlayingQuery } from './graphql-api'

const Player = () => {
	const { data } = useQuery(currentlyPlayingQuery, {
		pollInterval: 5000,
	})

	if (!data || !data.currentlyPlaying.isPlaying) {
		return null
	}

	const {
		isPlaying,
		item: {
			trackName,
			artists: [{ name: artist }],
		},
	} = data.currentlyPlaying

	if (!artist && !trackName) {
		return <div className="player empty">Nothing playing</div>
	}

	return (
		<div className="player">
			<span className="title">{trackName}</span>{' '}
			<span className="artist">{artist}</span> (
			{isPlaying ? 'playing' : 'paused'})
		</div>
	)
}

export default Player
