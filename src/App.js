import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'
import MultiSongList from './MultiSongList'
import withData from './withData'
import { mapData, mapRecentlyPlayedData, transformAudioFeatures } from './mappers'

const RecentlyAddedSongList = withData(SongList, mapData, '/saved-tracks.json')
const RecentlyPlayedSongList = withData(SongList, mapRecentlyPlayedData, '/recently-played.json')
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
