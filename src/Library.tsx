import React, { useEffect } from 'react'
import SongList from './SongList'
import { tracksQuery } from './graphql-api'
import { useQuery } from '@apollo/client'
import { mapData } from './mappers'

const loadMore = async (next, fetchMore) => {
	if (!next) {
		return
	}

	const [, offset] = next.match(/offset=(\d+)/) ?? []

	if (!offset) {
		return
	}

	try {
		await fetchMore({
			variables: {
				offset,
			},
			updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
				if (!fetchMoreResult) {
					return previousResult
				}

				fetchMoreResult.tracks.items = [
					...previousResult.tracks.items,
					...fetchMoreResult.tracks.items,
				]

				return fetchMoreResult
			},
		})
	} catch {}
}

const Library = () => {
	const {
		loading,
		fetchMore,
		data = { tracks: { items: [], next: '' } },
	} = useQuery(tracksQuery, {
		notifyOnNetworkStatusChange: true,
	})

	useEffect(() => {
		loadMore(data.tracks.next, fetchMore)
	}, [data.tracks.next, fetchMore, data.tracks.items])

	return (
		<SongList
			items={mapData(data.tracks)}
			heading={'Library ' + (loading ? '(loading)' : '')}
		/>
	)
}

export default Library
