var express = require('express');
var app     = express();

// app.METHOD('URL LOCATION', function(req, res))

//have to goto localhost:3000/test to find
app.get('/test', function (req, res) {
  res.send("You found the test route.");
})

var server = app.listen(3000, function(){
  console.log("Server is 👾 on PORT 3000");
});
