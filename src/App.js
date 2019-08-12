import React, { Component } from 'react'

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

class App extends Component {
	constructor(props) {
		super(props)
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
				{false && (
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
				<Header />
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
