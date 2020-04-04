import React from 'react'
import { wait, render } from '@testing-library/react'

import App from './App'

it('renders without crashing', () => {
	const { baseElement, findByText } = render(<App />)

	findByText('Gold') // wait for async stuff to finish

	expect(baseElement).toHaveTextContent('Gold')
	expect(baseElement).toHaveTextContent('Recently Played')
})
