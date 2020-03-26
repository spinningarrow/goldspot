import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
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
	// @ts-ignore
	cache: new InMemoryCache(),
})
