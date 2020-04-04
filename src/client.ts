import { ApolloClient, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import { getSpotifyToken } from './utils'

const restLink = new RestLink({
	uri: 'https://api.spotify.com/v1/',
	headers: {
		Authorization: `Bearer ${getSpotifyToken()}`,
	},
})

export const client = new ApolloClient({
	link: restLink,
	cache: new InMemoryCache(),
})
