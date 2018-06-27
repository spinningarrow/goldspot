export const getSpotifyToken = () => {
	const [, token] = window.location.hash.match(/access_token=(.+?)&/) || []
	return token
}

