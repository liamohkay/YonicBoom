const db = require('../db/index.js');

module.exports = {
  searchArtist: (req, callback) => {
    let artist = req.body.artist.toUpperCase();
    let query = `
      SELECT * FROM artist
      WHERE UPPER(artist) LIKE '%${artist}%';`
    db.query(query, (err, data) => callback(err, data));
  }
}