module.exports = {
  searchArtist: (req, callback) => {
    let artist = req.body.artist.toUpperCase();
    let query = `
      SELECT * FROM artist
      WHERE UPPER(artist) LIKE ${artist};`
    db.query(query, (err, callback) => callback(err, data));
  }
}