import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'

import App from './App';

jest.mock('./Header', () => 'Header')
jest.mock('./SongList', () => 'SongList')

const renderer = new ShallowRenderer()

test('it renders without crashing', () => {
	const tree = renderer.render(<App recentlyAdded={[]} recentlyPlayed={[]} />)
	expect(tree).toMatchSnapshot()
})
