import React from 'react'

const SongItem = ({ albumArt, title, artist, url }) =>
	<li className="song-item">
		<img src={albumArt} alt="album art" />
		<a href={url} target="_blank">{title}</a>
		<span className="artist">{artist}</span>
	</li>

export default SongItem
