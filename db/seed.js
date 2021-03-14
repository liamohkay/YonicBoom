const path = require('path');
const mysql = require('mysql');
const xlsx = require('node-xlsx');

const runSeed = (db) =>  {
  let seedData = xlsx.parse(path.join(__dirname, 'seed.xlsx'));
  seedData = seedData[0].data.slice(1, seedData[0].data.length);
  // structure: arist, genre, pronouns, scbc, link
  seedData.map(row => {
    if (row[0].includes(',')) {
      let artistNames = row[0].split(', ');
      let artist = artistNames[0];
      let aliases = artistNames.slice(1, artistNames.length);

      let artistQuery = `
        INSERT INTO artist (artist, genre, pronouns, scbc, link)
        VALUES ('${artist}', '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}');`
      db.query(artistQuery, () => {});


      aliases.map(alias => {
        let aliasQuery = `
          INSERT INTO alias (artist, artist_alias)
          VALUES ('${artist}', '${alias}');`
        db.query(aliasQuery, () => {});
      });
    }
  });
};

// runSeed

module.exports = runSeed;

// first row is colnames
// then map => INSERT TO
// i will need to check if artist is csv
// if yes
//   parse - keep first val - insert remaining vals into alias db