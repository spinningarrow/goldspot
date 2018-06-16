import React from 'react'

export default ({ albumArt, title, url }) =>
	<li className="song-item">
		<img src={albumArt} alt={title} />
		<a href={url} target="_blank">{title}</a>
	</li>

