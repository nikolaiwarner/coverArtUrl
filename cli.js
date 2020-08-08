const coverArtUrl = require('./index')

const help = `
coverArtUrl

How to use:
coverArtUrl "artist name" "cover name"
`

const args = process.argv.slice(2)
if (args[0] && args[1]) {
  coverArtUrl({ artist: args[0], release: args[1] }).then((url) => {
    console.log(url)
  })
} else {
  console.log(help)
}
