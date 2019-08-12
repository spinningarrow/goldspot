import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
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

	it('initially invokes render with undefined items', async () => {
		const data = 'some data'
		const dataFn = jest.fn(() => Promise.resolve(data))
		const renderFn = jest.fn()

		renderer.render(<DataFetcher data={dataFn} render={renderFn} />)

		expect(renderFn).toHaveBeenCalledWith({ items: undefined })
	})

	it('awaits the data and then sets it in the state', async () => {
		const data = 'some data'
		const dataFn = jest.fn(() => Promise.resolve(data))
		const renderFn = jest.fn(() => 'I am a text')

		await act(async () => {
			render(<DataFetcher data={dataFn} render={renderFn} />)
		})

		expect(renderFn).toHaveBeenCalledWith({ items: data })
	})

	it('renders the provided component', () => {
		const mockRender = jest.fn()
		renderer.render(<DataFetcher data={jest.fn()} render={mockRender} />)

		expect(mockRender).toHaveBeenCalled()
	})
})
