import React, { useState } from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import DataFetcher from './DataFetcher'
import Header from './Header'
import MultiSongList from './MultiSongList'
import Player from './Player'
import RecentlyPlayed from './RecentlyPlayed'
import RecentlyAdded from './RecentlyAdded'
import { getAudioFeatures } from './api'
import { client } from './client'

const App = () => {
	const [audioFeaturesSongList, setAudioFeaturesSongList] = useState(
		'energize'
	)

	const [enabledFeatures, setEnabledFeatures] = useState([])
	const [view, setView] = useState('played')

	return (
		<ApolloProvider client={client}>
			<div className="app">
				<Player />

				<Header secretAction={setEnabledFeatures} setView={setView} />

				<main>
					{view === 'played' && <RecentlyPlayed />}

					{view === 'added' && <RecentlyAdded />}

					{view === 'features' && <DataFetcher
						data={getAudioFeatures}
						render={({ items }) => (
							<MultiSongList
								selectedSongList={audioFeaturesSongList}
								handleSelection={setAudioFeaturesSongList}
								items={items}
							/>
						)}
					/>}
				</main>
			</div>
		</ApolloProvider>
	)
}

export default App
