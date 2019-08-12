import React, { useState } from 'react'

import DataFetcher from './DataFetcher'
import Header from './Header'
import MultiSongList from './MultiSongList'
import Player from './Player'
import SongList from './SongList'
import {
	getAudioFeatures,
	getNowPlaying,
	getRecentlyPlayed,
	getTracks,
} from './api'

const App = () => {
	const [audioFeaturesSongList, setAudioFeaturesSongList] = useState(
		'energize'
	)

	const [enabledFeatures, setEnabledFeatures] = useState([])

	return (
		<div className="app">
			{enabledFeatures.includes('Player') && (
				<DataFetcher
					data={getNowPlaying}
					render={({
						items: { artist, trackName, isPlaying } = {},
					}) => (
						<Player
							artist={artist}
							trackName={trackName}
							isPlaying={isPlaying}
						/>
					)}
				/>
			)}

			<Header secretAction={setEnabledFeatures} />

			<main>
				<DataFetcher
					data={getRecentlyPlayed}
					render={({ items }) => (
						<SongList heading="Recently Played" items={items} />
					)}
				/>

				<DataFetcher
					data={getTracks}
					render={({ items }) => (
						<SongList items={items} heading="Recently Added" />
					)}
				/>

				<DataFetcher
					data={getAudioFeatures}
					render={({ items }) => (
						<MultiSongList
							selectedSongList={audioFeaturesSongList}
							handleSelection={setAudioFeaturesSongList}
							items={items}
						/>
					)}
				/>
			</main>
		</div>
	)
}

export default App
