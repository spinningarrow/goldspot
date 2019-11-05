import React from 'react'

const Player = ({ artist, trackName, isPlaying = false }) => {
	if (!artist && !trackName) {
		return <div className="player empty">Nothing playing</div>
	}

	return (
		<div className="player">
			<span className="title">{trackName}</span>{' '}
			<span className="artist">{artist}</span> ({isPlaying
				? 'playing'
				: 'paused'})
		</div>
	)
}

export default Player
