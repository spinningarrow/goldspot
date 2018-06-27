import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'
import withData from './withData'

const mapData = data => data.items.map(({
	played_at: playedAt,
	added_at: addedAt,
	track: {
		id,
		name: title,
		album: { images },
		external_urls: { spotify },
		artists,
		audioFeatures
	}
}) => ({
	addedAt,
	albumArt: images[1].url,
	title,
	artist: artists[0].name,
	id,
	playedAt,
	url: spotify,
	audioFeatures
}))

const mapRecentlyPlayed = items => items.map(({
	albumArt,
	title,
	id,
	url,
	playedAt
}) => ({
	id: id + playedAt,
	albumArt,
	title,
	url,
}))

const RecentlyAddedSongList = withData(SongList, '/saved-tracks.json', mapData)
const RecentlyPlayedSongList = withData(SongList, '/recently-played.json', json => mapRecentlyPlayed(mapData(json)))

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
