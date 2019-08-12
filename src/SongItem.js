import React from 'react'
import { playTrack } from './api'

const SongItem = ({ albumArt, title, artist, url, id }) => (
	<li className="song-item">
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			onClick={playTrack(id)}
		>
			<img src={albumArt} alt="album art" />
			<span className="title">{title}</span>
		</a>
		<span className="artist">{artist}</span>
	</li>
)

export default SongItem
