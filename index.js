const musicbrainz = require('musicbrainz')
const fetch = require('node-fetch')

function coverArtUrl({ artist, release }) {
  return new Promise((resolve, reject) => {
    musicbrainz.searchReleases(release, { artist }, async function (err, releases) {
      if (err) reject(err)
      if (releases.length) {
        const response = await fetch(
          `https://coverartarchive.org/release/${releases[0].id}`,
        )
        if (response.ok) {
          const coverArt = await response.json()
          if (coverArt.images && coverArt.images.length) {
            resolve(coverArt.images[0].image)
          } else {
            // No cover art for this release
            resolve()
          }
        } else {
          // No cover art for this release
          resolve()
        }
      } else {
        // No release found
        resolve()
      }
    })
  })
}

module.exports = coverArtUrl
