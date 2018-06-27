import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'
import MultiSongList from './MultiSongList'
import withData from './withData'
import { mapData, mapRecentlyPlayedData, transformAudioFeatures } from './mappers'

const RecentlyAddedSongList = withData(SongList, mapData, 'https://api.spotify.com/v1/me/tracks')
const RecentlyPlayedSongList = withData(SongList, mapRecentlyPlayedData, 'https://api.spotify.com/v1/me/player/recently-played')
const AudioFeaturesList = withData(MultiSongList, transformAudioFeatures, '/saved-tracks-audio-features.json', '/saved-tracks.json')

class App extends Component {
	constructor() {
		super()
		this.state = {
			audioFeaturesSongList: 'energize',
		}
	}

	handleSelection = (key) => {
		this.setState({
			audioFeaturesSongList: key
		})
	}

	render() {
		return <div className="app">
			<Header />
			<main>
				<RecentlyAddedSongList heading="Recently Added" />
				<RecentlyPlayedSongList heading="Recently Played" />
				<AudioFeaturesList selectedSongList={this.state.audioFeaturesSongList} handleSelection={this.handleSelection} />
			</main>
		</div>
	}
}

export default App
