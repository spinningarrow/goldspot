import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import SongList from './SongList'

const renderer = new ShallowRenderer()

const items = [
	{
		id: 1,
		albumArt: 'art1.jpg',
		title: 'The Best Song',
		artist: 'Artist Five',
		url: 'https://the/best/song',
	},
	{
		id: 2,
		albumArt: 'art2.jpg',
		title: 'Song #2',
		artist: 'Arty',
		url: 'https://the/second/song',
	},
]

test('it renders a list of SongItems', () => {
	const tree = renderer.render(<SongList heading="Some Songs" items={items} />)
	expect(tree).toMatchSnapshot()
})
