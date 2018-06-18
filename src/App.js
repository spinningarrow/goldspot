import React, { Component } from 'react'

import Header from './Header'
import SongList from './SongList'

class App extends Component {
	constructor() {
		super()
		this.state = {
			data: [],
			recentlyAdded: [],
			recentlyPlayed: [],
		}
	}

	render() {
		return <div className="app">
			<Header />
			<main>
				<SongList heading="Recently Added" items={this.props.recentlyAdded} />
				<SongList heading="Recently Played" items={this.props.recentlyPlayed.map(({
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
