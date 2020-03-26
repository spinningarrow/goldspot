import React from 'react'

import SongList from './SongList'

const MultiSongList = ({
	items: multiSongListData = {},
	selectedSongList,
	handleSelection,
}) => {
	if (!Object.keys(multiSongListData).length) return <div></div>
	return (
		<div className="multi-song-list">
			<h1>
				<ul className="multi-song-list-items">
					{Object.keys(multiSongListData).map((key) => {
						return (
							<li
								key={key}
								className={
									selectedSongList === key ? 'selected' : ''
								}
								onClick={() => handleSelection(key)}
							>
								{key}
							</li>
						)
					})}
				</ul>
			</h1>
			<SongList items={multiSongListData[selectedSongList]} />
		</div>
	)
}

export default MultiSongList
