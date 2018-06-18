import React from 'react';
import renderer from 'react-test-renderer'

import App from './App';

jest.mock('./Header', () => 'Header')
jest.mock('./SongList', () => 'SongList')

const originalFetch = window.fetch

const mockData = {
	items: []
}

beforeEach(() => {
	window.fetch = () => Promise.resolve({
		json() {
			return Promise.resolve(mockData)
		}
	})
})

afterEach(() => {
	window.fetch = originalFetch
})

test('it renders without crashing', () => {
	const tree = renderer.create(<App />).toJSON()
	expect(tree).toMatchSnapshot()
})
