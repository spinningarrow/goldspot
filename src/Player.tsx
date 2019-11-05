import React from 'react'

const Player = ({ artist, trackName, isPlaying = false }) => {
	if (!artist && !trackName) {
		return <div className="player empty">Nothing playing</div>
	}

	return (
		<div className="player">
			{trackName} {artist} ({isPlaying ? 'playing' : 'paused'})
		</div>
	)
}

export default Player
