import React from 'react'

const Player = ({ artist, trackName, isPlaying = false }) => (
	<div className="player">
		{trackName} {artist} ({isPlaying ? 'playing' : 'paused'})
	</div>
)

export default Player
