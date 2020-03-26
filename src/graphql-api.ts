import gql from 'graphql-tag'

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
