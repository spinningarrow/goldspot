import React from 'react'
import renderer from 'react-test-renderer'

import SongItem from './SongItem'

describe('SongItem', () => {
	it('displays the given details about the song item', () => {
		const tree = renderer
			.create(<SongItem albumArt="art.jpg" title="Dans L'sang" url="https://spotify/song" />)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
