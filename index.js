const fetch = require('node-fetch')

function coverArtUrl({ artist, release }) {
  return fetch(
    `https://musicbrainz.org/ws/2/release?fmt=json&limit=1&query=artist:${artist} AND release:${release}`,
  ).then(async (mbResponse) => {
    const mbData = await mbResponse.json()
    if (mbData && mbData.releases && mbData.releases.length) {
      const caResponse = await fetch(
        `https://coverartarchive.org/release/${mbData.releases[0].id}`,
      )
      if (caResponse.ok) {
        const coverArt = await caResponse.json()
        if (coverArt.images && coverArt.images.length) {
          return coverArt.images[0].image
        } else {
          // No cover art for this release
          return
        }
      } else {
        // No cover art for this release
        return
      }
    } else {
      // No release found
      return
    }
  })
}

module.exports = coverArtUrl
