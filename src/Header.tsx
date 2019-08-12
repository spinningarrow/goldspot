import React from 'react'

const Header = ({ secretAction }) => (
	<header
		onClick={() => {
			secretAction(
				(prompt('Which features do you want to enable?') || '').split(',')
			)
		}}
	>
		<h1>
			<span>Gold</span>spot
		</h1>
	</header>
)

export default Header
