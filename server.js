var express = require('express');
var Superhero = require('./models/superhero')
var app     = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

//required to connect to our local database.
//it will look for/ or create a db called superheroes.
mongoose.connect("mongodb://localhost/superheroes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/superheroes', function(req,res){

  Superhero.find(function(err, data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });

})

app.post('/superheroes', function(req,res){
  var newSuper = new Superhero({
      name: req.body.name,
      superPower: req.body.superPower,
      universe: req.body.universe,
      evil: req.body.evil,
      rank: req.body.rank
  });
  newSuper.save(function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.json(data)
    }
  });
})

app.get('/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
})
// app.METHOD('URL LOCATION', function(req, res))

var server = app.listen(3000, function(){
  console.log("Server is 💩  on PORT 3000");
});
