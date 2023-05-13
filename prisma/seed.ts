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
      let allAliases: any = [];

      results.forEach((row: any, i: number) => {
        Object.keys(row).map((col: string) => row[col] = row[col].trim());
        
        allArtists.push({
          id: i,
          artist: row.artist,
          genre: row.genre,
          pronoun: row.pronoun,
          artistUrl: row.artistUrl,
          songUrl: row.songUrl,
          createdBy: 'liamohkay@gmail.com'
        })
      })

      await prisma.Artist.createMany({ data: allArtists, skipDuplicates: true })
      console.log('Added artist data')

      results.forEach((row: any, i: number) => {
        Object.keys(row).map((col: string) => row[col] = row[col].trim());
        if (row.alias1 !== '' && /^[A-Za-z][A-Za-z0-9]*$/.test(row.alias1)) {
          allAliases.push({
            alias: row.alias1,
            artistId: i,
            createdBy: 'liamohkay@gmail.com'
          })
        } 
        
        if (row.alias2 !== '' && /^[A-Za-z][A-Za-z0-9]*$/.test(row.alias2)) {
          allAliases.push({
            alias: row.alias2,
            artistId: i,
            createdBy: 'liamohkay@gmail.com'
          })
        }
      })

      // allAliases.forEach(async (alias: any) => await prisma.Alias.create({data: alias}))
      await prisma.Alias.createMany({ data: allAliases });
      console.log('Added alias data')
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