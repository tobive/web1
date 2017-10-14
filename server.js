var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.listen(PORT, function() {
  console.log("Express is listening on port ", PORT);
});
