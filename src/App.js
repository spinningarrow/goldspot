import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'
import MultiSongList from './MultiSongList'
import DataFetcher from './DataFetcher'
import {
	mapData,
	mapRecentlyPlayedData,
	transformAudioFeatures,
} from './mappers'

class App extends Component {
	constructor() {
		super()
		this.state = {
			audioFeaturesSongList: 'energize',
		}
	}

	handleSelection = key => {
		this.setState({
			audioFeaturesSongList: key,
		})
	}

	render() {
		return (
			<div className="app">
				<Header />
				<main>
					<DataFetcher
						urls={['https://api.spotify.com/v1/me/tracks']}
						transformData={mapData}
						render={({ items }) => (
							<SongList items={items} heading="Recently Added" />
						)}
					/>

					<DataFetcher
						urls={[
							'https://api.spotify.com/v1/me/player/recently-played',
						]}
						transformData={mapRecentlyPlayedData}
						render={({ items }) => (
							<SongList heading="Recently Played" items={items} />
						)}
					/>

					<DataFetcher
						urls={[
							'/saved-tracks-audio-features.json',
							'/saved-tracks.json',
						]}
						transformData={transformAudioFeatures}
						render={({ items }) => (
							<MultiSongList
								selectedSongList={
									this.state.audioFeaturesSongList
								}
								handleSelection={this.handleSelection}
								items={items}
							/>
						)}
					/>
				</main>
			</div>
		)
	}
}

export default App
