import { compose, groupBy, uniqWith } from 'ramda'

export const mapData = (data) =>
	data.items.map(
		({
			played_at: playedAt,
			added_at: addedAt,
			track: {
				id,
				name: title,
				album: { images },
				external_urls: { spotify },
				artists,
				audioFeatures,
			},
		}) => ({
			addedAt,
			albumArt: images[1].url,
			title,
			artist: artists[0].name,
			id,
			playedAt,
			url: spotify,
			audioFeatures,
		})
	)

const mapRecentlyPlayed = (items) =>
	items.map((item) => ({
		...item,
	}))

export const mapRecentlyPlayedData = compose(
	mapRecentlyPlayed,
	uniqWith(({ id: idA }, { id: idB }) => idA === idB),
	mapData
)

const groupAudioFeatures = groupBy(({ audioFeatures = {} }) => {
	if (
		audioFeatures.energy > 0.65 &&
		audioFeatures.danceability < 0.7 &&
		audioFeatures.speechiness < 0.5
	) {
		return 'energize'
	}
	if (audioFeatures.danceability > 0.7) return 'dance'
	if (audioFeatures.acousticness > 0.7) return 'acoustic'
	if (audioFeatures.danceability > 0.4 && audioFeatures.danceability < 0.6) {
		return 'flow'
	}
	if (audioFeatures.danceability * audioFeatures.energy < 0.4) {
		return 'sombre'
	}
	return 'other'
})

const mergeAudioFeatures = (audioFeaturesData, tracksData) => {
	tracksData.items.forEach((item, index) => {
		if (audioFeaturesData.audio_features[index]) {
			item.track.audioFeatures = audioFeaturesData.audio_features[index]
		}
	})

	return tracksData
}

export const transformAudioFeatures = compose(
	groupAudioFeatures,
	mapData,
	mergeAudioFeatures
)
