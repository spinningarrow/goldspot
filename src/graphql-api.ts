import gql from 'graphql-tag'

export const recentlyPlayedQuery = gql`
	query {
		recentlyPlayed
			@rest(
				type: "RecentlyPlayed"
				path: "me/player/recently-played?limit=50"
			) {
			items
		}
	}
`

export const currentlyPlayingQuery = gql`
	query {
		currentlyPlaying
			@rest(type: "CurrentlyPlaying", path: "me/player/currently-playing") {
			isPlaying: is_playing
			item @type(name: "Item") {
				artists
				trackName: name
			}
		}
	}
`
