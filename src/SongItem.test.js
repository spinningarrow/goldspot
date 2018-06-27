import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import SongItem from './SongItem'

const renderer = new ShallowRenderer()

test('it displays the given details about the song item', () => {
	const tree = renderer
		.render(<SongItem albumArt="art.jpg" title="Dans L'sang" url="https://spotify/song" />)
	expect(tree).toMatchSnapshot()
})
