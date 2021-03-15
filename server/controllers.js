const dbQueries = require('../db/dbQueries.js');

module.exports = {
  searchArtist: (req, res) => {
    dbQueries.searchArtist(req, (err, data) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(data);
    });
  }
};