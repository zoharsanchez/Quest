var controllers = require('./controllers');
var router = require('express').Router();

router.post('/artifacts', controllers.postArtifact);

// router.get('/artifacts', function(req, res) { console.log('gotten'); res.sendStatus(200); });

module.exports = router;
