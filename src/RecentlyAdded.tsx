import React from 'react'
import SongList from './SongList'
import { recentlyAddedQuery } from './graphql-api'
import { useQuery } from '@apollo/react-hooks'
import { mapData } from './mappers'

const RecentlyAdded = () => {
	const { data = { recentlyAdded: { items: [] } } } = useQuery(
		recentlyAddedQuery
	)

	return (
		<SongList
			items={mapData(data.recentlyAdded)}
			heading="Recently Added"
		/>
	)
}

export default RecentlyAdded
