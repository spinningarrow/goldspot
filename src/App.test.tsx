import React from 'react'
import { render } from '@testing-library/react'

import App from './App'

it('renders without crashing', () => {
	const { baseElement } = render(
		<App />
	)

	expect(baseElement).toHaveTextContent('Gold')
	expect(baseElement).toHaveTextContent('Recently Played')
})
