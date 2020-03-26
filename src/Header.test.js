import React from 'react'
import { render } from '@testing-library/react'

import Header from './Header'

test('it renders a heading with the app name', () => {
	const { baseElement } = render(<Header />)

	expect(baseElement).toHaveTextContent('Goldspot')
})
