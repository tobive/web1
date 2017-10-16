var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;

app.use('/', express.static('public', {
  setHeaders: function(res) {
    // res.type('text/html; charset=UTF-8; application/json');
    // res.setHeader('Content-Type','text/css');
    // res.setHeader('Content-Type', 'charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=600');
    res.setHeader('Vary', 'Accept-Encoding, Cookie');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Connection', 'Keep-Alive');
    // console.log(res.get('Content-Type'));
  }
}));

app.listen(PORT, function() {
  console.log("Express is listening on port ", PORT);
});
