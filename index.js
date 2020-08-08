const fetch = require('node-fetch')
const Nodebrainz = require('nodebrainz')

function coverArtUrl({ artist, release }) {
  return new Promise((resolve, reject) => {
    const nodebrainz = new Nodebrainz({
      userAgent: 'coverArtUrl/1.0.2 ( https://github.com/nikolaiwarner/coverarturl )',
    })
    nodebrainz.search('release', { artist, release, limit: 1 }, async function (
      err,
      releases,
    ) {
      if (err) reject(err)
      if (releases && releases.releases.length) {
        const response = await fetch(
          `https://coverartarchive.org/release/${releases.releases[0].id}`,
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
