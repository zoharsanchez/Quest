var firebase = require('firebase');
var cloudinary = require('cloudinary');
var Promise = require('bluebird');
var fs = require('fs');
var decoder = require('node-base64-image');
var firebaseConfig = require('../config/firebase.js');
var cloudinaryConfig = require('../config/cloudinary.js');

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

cloudinary.config(cloudinaryConfig);

module.exports = {
  artifacts: {
    post: function(req, res) {
      console.log('Post request received');

      var decodeAsync = Promise.promisify(decoder.decode);
      var buff = new Buffer(req.body.base64.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
      console.log('Buffer created');

      decodeAsync(buff, {filename: 'artifact'})
      .then(function(err, response) {
        if (err) { console.log(err); }
        else { console.log(response); }
        cloudinary.uploader.upload(
          'artifact.jpg',
          function(result) {
            console.log('Successfully uploaded to Cloudinary');
            database.ref('artifacts').push(
              {
                message: req.body.message,
                user: req.body.user,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                timestamp: req.body.timestamp,
                tags: req.body.tags,
                url: result.url
              }
            , function() {
              console.log('Successfully pushed to firebase');
              fs.unlink('artifact.jpg');
            });
          }
        );
      });

    }
  }
};
