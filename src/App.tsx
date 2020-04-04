import React, { useState } from 'react'
import { useQuery, ApolloProvider } from '@apollo/client'

import DataFetcher from './DataFetcher'
import Header from './Header'
import Library from './Library'
import MultiSongList from './MultiSongList'
import Player from './Player'
import RecentlyAdded from './RecentlyAdded'
import RecentlyPlayed from './RecentlyPlayed'
import { client } from './client'
import { getAudioFeatures } from './api'
import { currentViewQuery } from './graphql-api'

client.writeQuery({ query: currentViewQuery, data: { currentView: 'played' } })

const App = () => {
	const [audioFeaturesSongList, setAudioFeaturesSongList] = useState(
		'energize'
	)

	const [enabledFeatures, setEnabledFeatures] = useState([])
	const { data } = useQuery(currentViewQuery, { client })
	const { currentView } = data

	return (
		<ApolloProvider client={client}>
			<div className="app">
				<Player />

				<Header secretAction={setEnabledFeatures} />

				<main>
					{currentView === 'played' && <RecentlyPlayed />}

					{currentView === 'added' && <RecentlyAdded />}

					{currentView === 'library' && <Library />}

					{currentView === 'features' && (
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
