import React from 'react'
import renderer from 'react-test-renderer'

import Header from './Header'

test('it renders a heading with the app name', () => {
	const tree = renderer.create(<Header />).toJSON()
	expect(tree).toMatchSnapshot()
})
