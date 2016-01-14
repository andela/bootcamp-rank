module.exports = function(app) {
  // home route
  app.get('/*', function home(req, res) {
    res.sendFile('index.html', {
      root: './public/'
    });
  });
};
