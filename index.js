var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, './public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/*=============================================
  All our routes will go here
===============================================*/

app.get('/*', function home(req, res) {
  res.sendFile('index.html', {
    root: './public/'
  });
});

//create server

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on %d, in %s' +
    'mode', server.address().port, app.get('env'));
});

module.exports = app;
