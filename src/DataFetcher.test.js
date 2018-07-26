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

	it('awaits the data and then sets it in the state', async () => {
		const data = 'some data'
		const dataFn = jest.fn(() => Promise.resolve(data))

		renderer.render(<DataFetcher data={dataFn} render={jest.fn()} />)
		const instance = renderer.getMountedInstance()
		await instance.componentDidMount()

		expect(instance.state.items).toBe(data)
	})

	it('renders the provided component', () => {
		const mockRender = jest.fn()
		renderer.render(<DataFetcher data={jest.fn()} render={mockRender} />)

		expect(mockRender).toHaveBeenCalled()
	})
})
