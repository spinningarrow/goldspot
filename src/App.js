import React, { Component } from 'react';
import './App.css';

const mapData = data => data.items.map(({
	played_at: playedAt,
	added_at: addedAt,
	track: { id, name: title, album: { images }, artists }
}) => ({
	addedAt,
	albumArt: images[1].url,
	title,
	artist: artists[0].name,
	id,
	playedAt
}))

const SongItem = ({ albumArt, title }) =>
	<li className="song-item">
		<img src={albumArt} alt={title} />
		<span>{title}</span>
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
		return <div>
			<SongList heading="Recently Added">
				{this.state.recentlyAdded.map(({ albumArt, title, id }) => <SongItem key={id} albumArt={albumArt} title={title} />)}
			</SongList>

			<SongList heading="Recently Played">
				{this.state.recentlyPlayed.map(({ albumArt, title, id, playedAt }) => <SongItem key={id + playedAt } albumArt={albumArt} title={title} />)}
			</SongList>
		</div>
	}
}

export default App;
