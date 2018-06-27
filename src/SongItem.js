import React from 'react'

const SongItem = ({ albumArt, title, url }) =>
	<li className="song-item">
		<img src={albumArt} alt="album art" />
		<a href={url} target="_blank">{title}</a>
	</li>

export default SongItem
