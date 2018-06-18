import React from 'react'
import renderer from 'react-test-renderer'

import SongList from './SongList'

jest.mock('./SongItem', () => 'SongItem')

const items = [
	{
		id: 1,
		albumArt: 'art1.jpg',
		title: 'The Best Song',
		url: 'https://the/best/song',
	},
	{
		id: 2,
		albumArt: 'art2.jpg',
		title: 'Song #2',
		url: 'https://the/second/song',
	},
]

test('it renders a list of SongItems', () => {
	const tree = renderer.create(<SongList heading="Some Songs" items={items} />)
		.toJSON()

	expect(tree).toMatchSnapshot()
})
