import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'

const mapData = data => data.items.map(({
	played_at: playedAt,
	added_at: addedAt,
	track: {
		id,
		name: title,
		album: { images },
		external_urls: { spotify },
		artists
	}
}) => ({
	addedAt,
	albumArt: images[1].url,
	title,
	artist: artists[0].name,
	id,
	playedAt,
	url: spotify
}))

class App extends Component {
	constructor() {
		super()
		this.state = {
			data: [],
			recentlyAdded: [],
			recentlyPlayed: [],
		}
	}

	componentDidMount() {
		fetch('/saved-tracks.json')
			.then(response => response.json())
			.then(mapData)
			.then(recentlyAdded => this.setState({ recentlyAdded }))

		fetch('/recently-played.json')
			.then(response => response.json())
			.then(mapData)
			.then(recentlyPlayed => this.setState({ recentlyPlayed }))
	}

	render() {
		return <div className="app">
			<Header />
			<main>
				<SongList heading="Recently Added" items={this.state.recentlyAdded} />
				<SongList heading="Recently Played" items={this.state.recentlyPlayed.map(({
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
				}))} />
			</main>
		</div>
	}
}

export default App;
