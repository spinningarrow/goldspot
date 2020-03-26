import React from 'react'

const Header = ({ secretAction, setView }) => (
	<header>
		<h1
			onClick={() => {
				secretAction(
					(prompt('Which features do you want to enable?') || '').split(',')
				)
			}}
		>
			<span>Gold</span>spot
		</h1>
		<nav>
			<ul>
				<li onClick={() => setView('played')}>Recently Played</li>
				<li onClick={() => setView('added')}>Recently Added</li>
				<li onClick={() => setView('features')}>Features</li>
			</ul>
		</nav>
	</header>
)

export default Header
