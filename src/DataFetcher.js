import React from 'react'

class DataFetcher extends React.Component {
	state = {
		items: undefined,
	}

	async componentDidMount() {
		const { data } = this.props

		this.setState({
			items: await data(),
		})
	}

	render() {
		return this.props.render(this.state)
	}
}

export default DataFetcher
