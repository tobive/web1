var express = require('express');
var app = express();
var path = require('path');
var compress = require('compression');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8000;

app.use(function(req, res, next) {
  console.log(req.headers);
  res.setHeader('Access-Control-Allow-Origin', 'http://staticweb-tobive.herokuapp.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Vary', "Origin");
  res.status(200);
  next();
})

app.use(compress());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.listen(PORT, function() {
  console.log("Express is listening on port ", PORT);
});
