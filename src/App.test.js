import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { render } from '@testing-library/react'

import App from './App'

const renderer = new ShallowRenderer()

test('it renders without crashing', () => {
	const { baseElement } = render(
		<App recentlyAdded={[]} recentlyPlayed={[]} />
	)

	expect(baseElement).toHaveTextContent('Gold')
	expect(baseElement).toHaveTextContent('Recently Played')
})
