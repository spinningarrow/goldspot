import React from 'react'
import { useApolloClient } from '@apollo/client'

import { currentViewQuery } from './graphql-api'

const Header = ({ secretAction = (_) => {}, setView = (_) => {} }) => {
	const client = useApolloClient()
	const setCurrentView = (currentView) => {
		client.writeQuery({
			query: currentViewQuery,
			data: { currentView },
		})
	}

	return (
		<header>
			<h1
				onClick={() => {
					secretAction(
						(
							prompt('Which features do you want to enable?') ||
							''
						).split(',')
					)
				}}
			>
				<span>Gold</span>spot
			</h1>
			<nav>
				<ul>
					<li onClick={() => setCurrentView('played')}>
						Recently Played
					</li>
					<li onClick={() => setCurrentView('added')}>
						Recently Added
					</li>
					<li onClick={() => setCurrentView('library')}>Library</li>
					<li onClick={() => setCurrentView('features')}>Features</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
