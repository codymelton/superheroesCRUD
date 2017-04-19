var express = require('express');
var Superhero = require('./models/superhero')
var Villain = require('./models/villain')
var app     = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var path = require('path');
var superheroRoutes = require('./routes/superheroes')

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

// Posts to the villain DB
app.post('/api/villains', function(req,res){
    var newVillain = new Villain();

    newVillain.loadPower(req.body.evilPower);
    newVillain.loadData(req.body);

    newVillain.save(function(err,data){
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

// app.delete for villain
app.delete('/api/villains/:villain_id', function(req,res){
  Villain.remove({_id: req.params.villain_id}, function(err){
    if (err) {
      console.log(err);
    } else {
      res.send("Villain is wiped!")
    }
  });
});


app.put('/api/villains/:villain_id', function(req,res) {
  Villain.findById(req.params.villain_id, function(err, villain){

    if (!villain) return res.status(404);
    villain.loadPower(req.body.evilPower);
    villain.loadData(req.body);
    villain.save(function(e){
      if (e) {
        res.status(500).send(e)
      } else {
        res.json(villain);
      }
    })
  })
})

//use the exported routes and use the new file to get the routes.
app.use('/api/superheroes', superheroRoutes)

//Server start happens last
var server = app.listen(3000, function(){
  console.log("This server is ready on PORT 3000");
});

module.exports = app;
