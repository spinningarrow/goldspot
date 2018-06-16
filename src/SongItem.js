import React from 'react'

export default ({ albumArt, title, url }) =>
	<li className="song-item">
		<img src={albumArt} alt="album art" />
		<a href={url} target="_blank">{title}</a>
	</li>

