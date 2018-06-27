import React from 'react'
import SongItem from './SongItem'

const SongList = ({ heading, items = [] }) =>
	<div className="song-list">
		<h1>{heading}</h1>
		<ul>{
			items.map(({ id, albumArt, title, url }) => <SongItem
				key={id}
				albumArt={albumArt}
				title={title}
				url={url}
			/>)
		}</ul>
	</div>

export default SongList
