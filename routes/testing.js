module.exports = function(router) {
  router.get('/testing', function(req, res) {
    res.render('testing');
  });
}