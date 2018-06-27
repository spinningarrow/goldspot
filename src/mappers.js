import { compose, groupBy } from 'ramda'

export const mapData = data => data.items.map(({
	played_at: playedAt,
	added_at: addedAt,
	track: {
		id,
		name: title,
		album: { images },
		external_urls: { spotify },
		artists,
		audioFeatures
	}
}) => ({
	addedAt,
	albumArt: images[1].url,
	title,
	artist: artists[0].name,
	id,
	playedAt,
	url: spotify,
	audioFeatures
}))

const mapRecentlyPlayed = items => items.map(({
	albumArt,
	title,
	id,
	url,
	playedAt
}) => ({
	id: id + playedAt,
	albumArt,
	title,
	url,
}))

export const mapRecentlyPlayedData = compose(mapRecentlyPlayed, mapData)

const groupAudioFeatures = groupBy(({ audioFeatures }) => {
	if (audioFeatures.energy > 0.7 && audioFeatures.danceability < 0.6 && audioFeatures.speechiness < 0.2) return 'energize'
	if (audioFeatures.danceability > 0.7) return 'dance'
	return 'other'
})

const mergeAudioFeatures = (audioFeaturesData, tracksData) => {
	tracksData.items.forEach((item, index) => {
		item.track.audioFeatures = audioFeaturesData.audio_features[index]
	})

	return tracksData
}

export const transformAudioFeatures = compose(groupAudioFeatures, mapData, mergeAudioFeatures)
