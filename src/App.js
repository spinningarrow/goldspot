import React, { Component } from 'react';

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

const Header = () =>
	<header>
		<h1><span>Gold</span>spot</h1>
	</header>

const SongItem = ({ albumArt, title, url }) =>
	<li className="song-item">
		<img src={albumArt} />
		<a href={url} target="_blank">{title}</a>
	</li>

const SongList = ({ heading, children }) =>
	<div className="song-list">
		<h1>{heading}</h1>
		<ul>{children}</ul>
	</div>

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
				<SongList heading="Recently Added">
					{this.state.recentlyAdded.map(({ albumArt, title, id, url }) => <SongItem key={id} albumArt={albumArt} title={title} url={url} />)}
				</SongList>

				<SongList heading="Recently Played">
					{this.state.recentlyPlayed.map(({ albumArt, title, id, url, playedAt }) => <SongItem key={id + playedAt } albumArt={albumArt} title={title} url={url} />)}
				</SongList>
			</main>
		</div>
	}
}

export default App;
