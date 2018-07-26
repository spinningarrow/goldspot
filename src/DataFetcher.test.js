import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import DataFetcher from './DataFetcher'

describe('when data is fetched', () => {
	let renderer
	const originalFetch = window.fetch

	beforeEach(() => {
		window.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json() {
					return Promise.resolve([])
				},
			})
		)

		renderer = new ShallowRenderer()
	})

	afterAll(() => {
		window.fetch = originalFetch
	})

	it('fetches all the specified URLs', async () => {
		const urls = ['https://some/api/1', 'https://some/api/2']
		renderer.render(
			<DataFetcher
				urls={urls}
				transformData={jest.fn()}
				render={jest.fn()}
			/>
		)
		await renderer.getMountedInstance().componentDidMount()

		expect(window.fetch).toHaveBeenCalledWith(urls[0], expect.anything())
		expect(window.fetch).toHaveBeenCalledWith(urls[1], expect.anything())
	})

	it('sets the transformed fetched data in the state', async () => {
		const transformedData = ['transformed data']
		const mockTransformData = jest.fn(() => transformedData)
		renderer.render(
			<DataFetcher
				urls={[]}
				transformData={mockTransformData}
				render={jest.fn()}
			/>
		)
		const instance = renderer.getMountedInstance()
		await instance.componentDidMount()

		expect(instance.state.items).toBe(transformedData)
	})

	it('renders the provided component', () => {
		const mockRender = jest.fn()
		renderer.render(
			<DataFetcher
				urls={[]}
				transformData={jest.fn()}
				render={mockRender}
			/>
		)

		expect(mockRender).toHaveBeenCalled()
	})
})
