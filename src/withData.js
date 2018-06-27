import React from 'react'

const getDisplayName = component => component.displayName || component.name || 'Component'

const withData = (WrappedComponent, transformData, ...urls) => {
	class WithData extends React.Component {
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

	WithData.displayName = `WithData(${getDisplayName(WrappedComponent)})`

	return WithData
}

export default withData
