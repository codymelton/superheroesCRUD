var chai = require ('chai');
var chaiHttp = require ('chai-http');
var should = chai.should();
var Superhero = require("../models/superhero");

chai.use(chaiHttp);

var server = require('../server');

describe('/GET all heroes', function(){

  it('returns heroes from database', function(done){
    chai.request(server)
    .get('/api/superheroes')
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.have.property('message').eql('Found your heroes!')
      res.body.data.should.be.a('array');
      done()
    })
  })
});

describe('/POST new hero', function(){
  it ('can create a new hero', function(done){

    var hero = {
      name: "Batman",
      superPower: "I got the money",
      evil: false,
      rank: 10,
      img: "http://cartoonbros.com/batman/batman-15"
    }

    chai.request(server)
      .post('/api/superheroes')
      .send(hero)
      .end(function(err,res) {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Hero created');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('name').eql('Batman');
        res.body.data.should.have.property('img');
        res.body.data.should.have.property('rank').eql(10);
        res.body.data.superPowers.should.be.a('array');
        done();
      })
  });

  it ('will not make a hero without a name', function(done){
    var hero = {
      superPower: "I got the money",
      evil: false,
      rank: 10,
      img: "http://cartoonbros.com/batman/batman-15"
    }

    chai.request(server)
      .post('/api/superheroes')
      .send(hero)
      .end(function(err,res) {
        res.body.should.have.property('errors');
        res.body.errors.name.should.have.property('kind').eql('required');
        done();
      });
  });
});

describe('/GET SINGLE HERO', function() {

  it ('should get hero by ID', function(done){
  var newSuper = new Superhero({ name: "Fred" });

  newSuper.save(function(err, hero){

    chai.request(server)
      .get('/api/superheroes/' + hero._id)
      .send(hero)
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name')
        done();
      })
  })
  })
})

describe('/EDIT A HERO', function(){
  it('I can update a hero', function(done){
    var hero = new Superhero ({ name: "Aqquaman"});
    hero.save(function(err,hero){
      chai.request(server)
        .put('/api/superheroes/' + hero._id)
        .send({ name: "Aquaman"})
        .end(function(err,res){
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Hero updated');
          res.body.hero.should.have.property('name').eql('Aquaman')
          done();
        })
    })
  })
})

describe('/DELETE A HERO', function(){
  it('Can delete a hero by id', function(done){
    var hero = new Superhero({ name: "Blueman" })
    hero.save(function(err, hero) {
      chai.request(server)
        .delete('/api/superheroes/' + hero._id)
        .end(function(err, res){
          res.should.have.status(200)
          done();
        })
    })
  })
});
