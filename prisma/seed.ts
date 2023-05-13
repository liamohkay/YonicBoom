const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client')
type Dictionary = { [index: string]: string }

const filePath: string = path.resolve(__dirname, 'artist_alias_seed.csv');
const prisma = new PrismaClient()

async function main() {
  let results: any = [];

  // Read in csv seed data
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data: any) => results.push(data))
    .on('end', async () => {
      let allArtists: any = [];

      results.forEach((row: any) => {
        Object.keys(row).map((col: string) => row[col] = row[col].trim());
        allArtists.push({
          artist: row.artist,
          genre: row.genre,
          pronoun: row.pronoun,
          artistUrl: row.artistUrl,
          songUrl: row.songUrl,
          createdBy: 'liamohkay@gmail.com'
        })
      })

      await prisma.Artist.createMany({ data: allArtists })
      console.log('Added artist data')
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })