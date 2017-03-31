var express = require('express');
var Superhero = require('./models/superhero')
var Villain = require('./models/villain')
var app     = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

//required to connect to our local database.
//it will look for/ or create a db called superheroes.
mongoose.connect("mongodb://localhost/superheroes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.METHOD('URL LOCATION', function(req, res))

// Returns all super heroes from the DB.
app.get('/superheroes', function(req,res){
  Superhero.find(function(err, data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
})

// Returns all villains from the DB
app.get('/villains', function(req,res){
  Villain.find(function(err, data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// Posts to the superhero DB
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
      res.json(data);
    }
  });
});

// Posts to the villain DB
app.post('/villains', function(req,res){
    var newVillain = new Villain({
      name: req.body.name,
      evilPower: req.body.evilPower,
      evil: req.body.evil,
      nemesis: req.body.nemesis
    });
    newVillain.save(function(err,data){
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
});

app.get('/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// app.delete

app.delete('/superheroes/:superhero_id', function(req,res){
  Superhero.remove({_id: req.params.superhero_id}, function(err){
    if (err) {
      console.log(err);
    } else {
      res.send("Super hero was 💩🛢'd")
    }
  });
});

// app.put

//Server start happens last
var server = app.listen(3000, function(){
  console.log("Server is 💩  on PORT 3000");
});
