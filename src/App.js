import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'
import MultiSongList from './MultiSongList'
import DataFetcher from './DataFetcher'
import { getAudioFeatures, getRecentlyPlayed, getTracks } from './api'

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
						data={getTracks}
						render={({ items }) => (
							<SongList items={items} heading="Recently Added" />
						)}
					/>

					<DataFetcher
						data={getRecentlyPlayed}
						render={({ items }) => (
							<SongList heading="Recently Played" items={items} />
						)}
					/>

					<DataFetcher
						data={getAudioFeatures}
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
