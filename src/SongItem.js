import React from 'react'

const SongItem = ({ albumArt, title, artist, url }) => (
	<li className="song-item">
		<a href={url} target="_blank">
			<img src={albumArt} alt="album art" />
			<span className="title">{title}</span>
		</a>
		<span className="artist">{artist}</span>
	</li>
)

export default SongItem
