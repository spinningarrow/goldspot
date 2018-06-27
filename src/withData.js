import React from 'react'

const withData = (WrappedComponent, transformData, ...urls) => {
	return class extends React.Component {
		constructor() {
			super()

			this.state = {
				items: undefined
			}
		}

		async componentDidMount() {
			const responses = await Promise.all(urls.map(url => fetch(url)))
			const jsons = await Promise.all(responses.map(response => response.json()))

			this.setState({
				items: transformData(...jsons)
			})
		}

		render() {
			return <WrappedComponent items={this.state.items} {...this.props} />
		}
	}
}

export default withData
