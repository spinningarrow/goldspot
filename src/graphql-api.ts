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

export const recentlyAddedQuery = gql`
	query {
		recentlyAdded @rest(type: "RecentlyAdded", path: "me/tracks?limit=50") {
			items
		}
	}
`

export const currentlyPlayingQuery = gql`
	query {
		currentlyPlaying
			@rest(
				type: "CurrentlyPlaying"
				path: "me/player/currently-playing"
			) {
			isPlaying: is_playing
			item @type(name: "Item") {
				artists
				trackName: name
			}
		}
	}
`

export const tracksQuery = gql`
	query($limit: Int! = 50, $offset: Int) {
		tracks(limit: $limit, offset: $offset)
			@rest(type: "Tracks", path: "me/tracks?{args}") {
			items
			next
		}
	}
`
