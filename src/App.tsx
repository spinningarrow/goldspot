import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import DataFetcher from './DataFetcher'
import Header from './Header'
import Library from './Library'
import MultiSongList from './MultiSongList'
import Player from './Player'
import RecentlyAdded from './RecentlyAdded'
import RecentlyPlayed from './RecentlyPlayed'
import { client } from './client'
import { getAudioFeatures } from './api'

const App = () => {
	const [audioFeaturesSongList, setAudioFeaturesSongList] = useState(
		'energize'
	)

	const [enabledFeatures, setEnabledFeatures] = useState([])
	const [view, setView] = useState('library')

	return (
		<ApolloProvider client={client}>
			<div className="app">
				<Player />

				<Header secretAction={setEnabledFeatures} setView={setView} />

				<main>
					{view === 'played' && <RecentlyPlayed />}

					{view === 'added' && <RecentlyAdded />}

					{view === 'library' && <Library />}

					{view === 'features' && (
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
					)}
				</main>
			</div>
		</ApolloProvider>
	)
}

export default App
