import React from 'react'
import SongList from './SongList'
import { recentlyPlayedQuery } from './graphql-api'
import { useQuery } from '@apollo/client'
import { mapRecentlyPlayedData } from './mappers'

const RecentlyPlayed = () => {
	const { data = { recentlyPlayed: { items: [] } } } = useQuery(
		recentlyPlayedQuery
	)

	return (
		<SongList
			heading="Recently Played"
			items={mapRecentlyPlayedData(data.recentlyPlayed)}
		/>
	)
}

export default RecentlyPlayed
