var express = require('express');
var Superhero = require('./models/superhero')
var Villain = require('./models/villain')
var app     = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var path = require('path');

//required to connect to our local database.
//it will look for/ or create a db called superheroes.
mongoose.connect("mongodb://localhost/superheroes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Tells express where client side (static) code
//is going to live in the public folder.
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Goes to index when goes to main /
app.get('/', function(req, res){
  res.render('index')
});

app.get('/heroes', function(req, res){
  res.render('good')
});

app.get('/villians', function(req, res){
  res.render('bad')
});

// app.METHOD('URL LOCATION', function(req, res))

// Returns all super heroes from the DB.
app.get('/api/superheroes', function(req,res){ //added /api for backend
  Superhero.find(function(err, data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
})

// Returns all villains from the DB
app.get('/api/villains', function(req,res){
  Villain.find(function(err, data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// Posts to the superhero DB
app.post('/api/superheroes', function(req,res){
  var newSuper = new Superhero({
      name: req.body.name,
      superPower: req.body.superPower,
      universe: req.body.universe,
      evil: req.body.evil,
      rank: req.body.rank,
      img: req.body.img
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
app.post('/api/villains', function(req,res){
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

//added /api for backend
app.get('/api/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err,data){
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

//Gets from villain DB
app.get('/api/villains/:villain_id', function(req,res){
  Villain.findById(req.params.villain_id, function(err,data) {
  if (err) {
    console.log(err);
  } else {
    res.json(data);
  }
  })
})

// app.delete

app.delete('/api/superheroes/:superhero_id', function(req,res){
  Superhero.remove({_id: req.params.superhero_id}, function(err){
    if (err) {
      console.log(err);
    } else {
      res.send("Super hero was 💩🛢'd")
    }
  });
});

//app.delete for villain
// app.delete('/api/villians/:villain_id' function(req,res){
//   Villain.remove({_id: req.params.superhero_id}, function(err){
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("Villain is wiped!")
//     }
//   });
// });

// app.put

app.put('/api/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err, hero){

    if (!hero) return res.status(404); //only in node.  404 is not found

    hero.name = req.body.name ? req.body.name : hero.name;
    hero.superPower = req.body.superPower ? req.body.superPower : hero.superPower;
    hero.universe = req.body.universe ? req.body.universe : hero.universe;
    hero.evil = req.body.evil ? req.body.evil : hero.evil;
    hero.rank = req.body.rank ? req.body.rank : hero.rank; //ctrl+d after highlight to edit same text in a line.
    hero.img = req.body.img ? req.body.img : hero.img
    hero.save(function(e){
      if (e) {
        res.status(500).send(e) //This is an internal server error
      } else {
        res.json(hero);
      }
    })
  })
});

//Server start happens last
var server = app.listen(3000, function(){
  console.log("Server is the 💩  on PORT 3000");
});
