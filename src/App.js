import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'
import withData from './withData'
import { mapData, mapRecentlyPlayedData } from './mappers'

const RecentlyAddedSongList = withData(SongList, mapData, '/saved-tracks.json')
const RecentlyPlayedSongList = withData(SongList, mapRecentlyPlayedData, '/recently-played.json')

class App extends Component {
	constructor() {
		super()
		this.state = {
		}
	}

	render() {
		return <div className="app">
			<Header />
			<main>
				<RecentlyAddedSongList heading="Recently Added" />
				<RecentlyPlayedSongList heading="Recently Played" />
			</main>
		</div>
	}
}

export default App;
