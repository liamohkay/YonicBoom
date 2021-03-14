const path = require('path');
const mysql = require('mysql');
const db = require('./index.js');
const xlsx = require('node-xlsx');

const runSeed = () =>  {
  let seedData = xlsx.parse(path.join(__dirname, 'seed.xlsx'));
  seedData = seedData[0].data.slice(1, seedData[0].data.length);

  seedData.map(row => {
    if (row[0].includes(',')) {
      let artistNames = row[0].split(', ');
      let aliases = artistNames.slice(1, artistNames.length);

      aliases.map(alias => {
        let aliasQuery = `
          INSERT INTO alias (artist, artist_alias)
          VALUES ('${artistNames[0]}', '${alias}');`
        db.query(aliasQuery, () => {});
      });
    }

    let artistQuery = `
      INSERT INTO artist (artist, genre, pronouns, scbc, link)
      VALUES ('${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}');`
    db.query(artistQuery, () => {});
  });
};

runSeed();