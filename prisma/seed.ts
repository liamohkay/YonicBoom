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

      /* Seed artist data */
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

      /* Seed artist aliases */
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
      await prisma.Alias.createMany({ data: allAliases });
      console.log('Added alias data')

      /* Seed first blog post */
      const firstBlogPost = await prisma.blog.create({
        data: {
          title: 'Welcome!',
          description: 'What is YonicBoom?',
          post: `YonicBoom! is a radio show based out of Hollow Earth Radio, in Seattle\'s Capitol Hill area. YB has taken many forms over the years, and currently is run by Andrea Nela. It began as a skill share show in 2014 and has been on air ever since.\n\n This database will serve to highlight women and non-binary artists across all sub genres of dance music. If you're interested in adding a name, drop a line!\n\nThis space will be used in future to highlight artists and releases.\n\nCheers!\nYB`,
          imageUrl: 'https://lirp.cdn-website.com/383569e1/dms3rep/multi/opt/Cream-and-Brown-Organic-Welcome-Yard-Sign-1920w-960w.png',
          createdBy: 'kspector@gmail.com' 
        }
      })
      console.log('Added first blog post by Kendall');
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