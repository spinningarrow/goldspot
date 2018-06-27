import React from 'react'

const withData = (WrappedComponent, url, transformData) => {
	return class extends React.Component {
		constructor() {
			super()

			this.state = {
				items: []
			}
		}

		async componentDidMount() {
			const response = await fetch(url)
			const json = await response.json()

			this.setState({
				items: transformData(json)
			})
		}

		render() {
			return <WrappedComponent items={this.state.items} {...this.props} />
		}
	}
}

export default withData
