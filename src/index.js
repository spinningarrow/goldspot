import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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

const recentlyAddedPromise = fetch('/saved-tracks.json')
	.then(response => response.json())
	.then(mapData)

const recentlyPlayedPromise = fetch('/recently-played.json')
	.then(response => response.json())
	.then(mapData)

Promise.all([recentlyAddedPromise, recentlyPlayedPromise]).then(([recentlyAdded, recentlyPlayed]) => {
	ReactDOM.render(
		<App recentlyAdded={recentlyAdded} recentlyPlayed={recentlyPlayed} />,
		document.getElementById('root')
	);
})

registerServiceWorker();
