import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Header from './Header'

const renderer = new ShallowRenderer()

test('it renders a heading with the app name', () => {
	const tree = renderer.render(<Header />)
	expect(tree).toMatchSnapshot()
})
