import { useEffect, useState } from 'react'

const DataFetcher = ({ data, render, refetchInterval = 0 }) => {
	const [items, setItems] = useState()

	useEffect(
		() => {
			data().then(setItems)

			if (refetchInterval) {
				setInterval(async () => {
					setItems(await data())
				}, refetchInterval)
			}
		},
		[data, refetchInterval]
	)

	return render({ items })
}

export default DataFetcher
