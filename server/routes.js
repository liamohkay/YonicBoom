const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/artist')
  .get(controllers.searchArtist)

module.exports = router;