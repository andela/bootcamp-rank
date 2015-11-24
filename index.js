var express = require('express'),
  path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/')));

app.get('/*', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.sendFile('index.html', {
    root: './'
  });
});

var server = app.listen(process.env.PORT || 8888, function() {
  console.log('Express server listening on %d, in %s' +
    ' mode', server.address().port, app.get('env'));
});

module.exports = app;
