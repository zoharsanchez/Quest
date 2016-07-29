var dbstorage = require('../dbstorage');

module.exports = {
  postArtifact: function(req, res) {
    dbstorage.artifacts.post(req,res);
  }
};
