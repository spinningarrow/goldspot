import React from 'react'

import { getSpotifyToken } from './utils'

class DataFetcher extends React.Component {
	state = {
		items: undefined,
	}

	async componentDidMount() {
		const { urls, transformData } = this.props

		const responses = await Promise.all(
			urls.map(url =>
				fetch(url, {
					headers: {
						Authorization: `Bearer ${getSpotifyToken()}`,
					},
				})
			)
		)

		const jsons = await Promise.all(
			responses.map(response => response.json())
		)

		this.setState({
			items: transformData(...jsons),
		})
	}

	render() {
		return this.props.render(this.state)
	}
}

export default DataFetcher
