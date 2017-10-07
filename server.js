var express = require('express');
var app = express();
var PORT = 3030;

app.use(express.static('public'));

app.listen(PORT, function() {
  console.log("Express is listening on port ", PORT);
});
