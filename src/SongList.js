import React from 'react'
import SongItem from './SongItem'

const SongList = ({ heading, items = [] }) => (
	<div className="song-list">
		<h1>{heading}</h1>
		<ul>
			{items.map(({ id, albumArt, title, artist, url }) => (
				<SongItem
					key={id}
					id={id}
					albumArt={albumArt}
					title={title}
					artist={artist}
					url={url}
				/>
			))}
		</ul>
	</div>
)

export default SongList
