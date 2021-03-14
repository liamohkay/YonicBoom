const path = require('path');
const mysql = require('mysql');
const xlsx = require('node-xlsx');

const seedDB = () =>  {
  let seedData = xlsx.parse(path.join(__dirname, 'seed.xlsx'));
  seedData = seedData[0].data.slice(1, seedData[0].data.length);
  // structure: arist, genre, pronouns, scbc, link
  seedData.map(row => {
    // Get artist aliases + insert into alias table
    if (row[0].includes(',')) {
      let artistNames = row[0].split(', ');
      let aliases = artistNames.slice(1, artistNames.length);
      aliases.map(alias => {
        mysql.query(`INSERT INTO alias VALUES ('${artistNames[0]}', '${alias}')`)
      })
    }
  });
};

seedDB();

// first row is colnames
// then map => INSERT TO
// i will need to check if artist is csv
// if yes
//   parse - keep first val - insert remaining vals into alias db