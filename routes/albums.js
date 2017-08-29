var path = require('path');
var fs = require('fs');
var file_path = path.resolve(path.dirname(__dirname), 'data/albums.json');

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path), 'utf8').data;
}

function nextID() {
  return JSON.parse(fs.readFileSync(file_path), 'utf8').last_id + 1;
}

function writeAlbums(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), 'utf8');
}

module.exports = function(router) {
  router.post('/albums', function(req, res) {
    var album = req.body;
    var albums = getAlbums();

    album.id = nextID();
    albums.push(album);
    writeAlbums({ 
      last_id: album.id, 
      data: albums, 
    });
    res.json(album);
  });

  router.get('/albums/new', function(req, res) {
    // renders the new.jade file from the /view directory
    res.render('new');
  });
};

// var path = require('path');
// var _ = require('underscore');
// var Albums = require(path.resolve(path.dirname(__dirname), 'modules/albums'));

// modules.exports = function(router) {
//   router.route('/albums').get(function(req, res) {
//     res.json(Albums.get());
//   }).post(function(req, res) {
//     var album = req.body;
//     var albums = Albums.get();

//     album.id = Albums.getLastID() + 1;
//     albums.push(album);
//     Albums.set(albums);
//     res.json(album);
//   }).put(function(req, res) {
//     var albums = Albums.get();
//   })
// }