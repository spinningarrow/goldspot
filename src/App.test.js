import React from 'react';
import renderer from 'react-test-renderer'

import App from './App';

jest.mock('./Header', () => 'Header')
jest.mock('./SongList', () => 'SongList')

test('it renders without crashing', () => {
	const tree = renderer.create(<App recentlyAdded={[]} recentlyPlayed={[]} />).toJSON()
	expect(tree).toMatchSnapshot()
})
