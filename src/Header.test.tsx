import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import Header from './Header'

it('renders a heading with the app name', () => {
	const { baseElement } = render(
		<MockedProvider>
			<Header />
		</MockedProvider>
	)

	expect(baseElement).toHaveTextContent('Goldspot')
})
