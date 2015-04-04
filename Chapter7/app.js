var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis = require("redis");

//client to connect to Redis
var client = redis.createClient();

http = require("http");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
http.createServer(app).listen(3000);


client.on('connect', function() {
  console.log('connected');
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//get url id and will proccess
app.get('/:id', function (req, res) {
  shortLink = "localhost:3000/" + req.params.id;
  console.log(shortLink);
  client.get(shortLink, function(err, reply) {
    if(reply === null){
      res.send("Error: Unable to find site's URL to redirect to.")
    } else {
      
      console.log("http://" + reply);
      res.redirect("http://" + reply);
    }
  });
  console.log(req.params.id);


});

app.post('/link', function (req, res) {

  var temp = req.body.link;
  var linkShort = "localhost:3000/"  + Date.now().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  var response = {"longL": "", "shortL": ""};
  

  client.get(temp, function(err, reply) {
    if (reply === null && temp.substring(0,14) === "localhost:3000") {
      console.log("error");
      res.send("cannot shorten this link");

    } else if(reply === null){
      client.set(temp, linkShort);
      client.set(linkShort, temp);
      response.longL = temp;
      response.shortL = linkShort;

      res.json(response);
      console.log(response);
    } else if (reply.substring(0,14) === "localhost:3000"){ //user enters long link
      response.longL = temp;
      response.shortL = reply;

      res.json(response);
      console.log(response);
    } else { //user enters short link
      response.longL = reply;
      response.shortL = temp;
      
      res.json(response);
      console.log(response);

    }
  });


});




app.get("/", function (req, res) {
  res.sendFile('public/index.html', {root: __dirname });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
