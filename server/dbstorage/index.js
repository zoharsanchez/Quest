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

var getLastIndex = function() {
  return new Promise(function(resolve, reject) {
    var timeRef = database.ref().orderByChild('timestamp').limitToLast(1);

    timeRef.once('value')
      .then(function(snapshot) {
      snapshot.forEach(function(record) {
        resolve(record.child('index').val());
      });
      resolve(0);
    })
    .catch(function(err) {
      console.log(err);
      reject(err);
    });
  });
};

module.exports = {
  artifacts: {
    post: function(req, res) {
      console.log('Post request received');
      getLastIndex().then(function(index) {
        var curIndex = index++;

        var decodeAsync = Promise.promisify(decoder.decode);
        var fileName = '' + curIndex;
        var buff = new Buffer(req.body.base64.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        console.log('Buffer created');

        decodeAsync(buff, {filename: fileName})
        .then(function(err, response) {
          if (err) { console.log(err); }
          else { console.log(response); }
          cloudinary.uploader.upload(
            fileName + '.jpg',
            function(result) {
              console.log('Successfully uploaded to Cloudinary');
              database.ref().push(
                {
                  message: req.body.message,
                  user: req.body.user,
                  latitude: 'here', //req.body.latitude,
                  longitude: 'there', //req.body.longitude,
                  timestamp: req.body.timestamp,
                  tags: req.body.tags,
                  url: result.url,
                  index: curIndex
                }
              , function() {
                console.log('Successfully pushed to firebase');
                fs.unlink(fileName + '.jpg');
              });
            }
          );
        });

      });

    }
  }
};
