var path = require('path');
var fs = require('fs');
var file_path = path.resolve(path.dirname(__dirname), 'data/albums.json');

// Call this function everytime we access the index route
function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path), 'utf8').data;
}

/* GET home page. */
module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', {
      albums: getAlbums(),
    });
  });
};
