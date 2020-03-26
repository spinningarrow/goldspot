import React, { useState } from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import DataFetcher from './DataFetcher'
import Header from './Header'
import MultiSongList from './MultiSongList'
import Player from './Player'
import SongList from './SongList'
import RecentlyPlayed from './RecentlyPlayed'
import { getAudioFeatures, getTracks } from './api'
import { client } from './client'

const App = () => {
	const [audioFeaturesSongList, setAudioFeaturesSongList] = useState(
		'energize'
	)

	const [enabledFeatures, setEnabledFeatures] = useState([])

	return (
		<ApolloProvider client={client}>
			<div className="app">
				<Player />

				<Header secretAction={setEnabledFeatures} />
				<main>
					<RecentlyPlayed />

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
		</ApolloProvider>
	)
}

export default App
