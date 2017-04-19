var express   = require('express');
var Router    = express.Router();
var Superhero = require('../models/superhero');
var async     = require('async');

Router.route('/')
  .get(function(req,res){
    Superhero.find(function(err, data){
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Found your heroes!",data });
      }
    });
  })

//POSTS AN ARRAY OF DATA ALL AT ONCE
Router.route('/multiplesupers')
  .post(function(req,res){
    //Works a bunch of things through all at once asynchronously
    var newHeros = [];
    async.each(req.body.data, function(hero, cb){ //works like for each method
      var newSuper = new Superhero();
      newSuper.loadPower(hero.superPower);
      newSuper.loadData(hero);

      newSuper.save()
        .then(function(newSuper){
          console.log(hero, 'EACH HERO SUCCESS');
          newHeros.push(newSuper);
          cb();
        }, function(err){
          if (err) throw cb(err);
        });
      }, function(err){
        if (err) throw err;
        res.json(newHeros);
      });

  });

  Router.route('/:superhero_id')
    .delete(function(req,res){
      Superhero.remove({_id: req.params.superhero_id}, function(err){
        if (err) {
          res.send(err);
        } else {
          res.json({message: "Super hero was 💩🛢'd"})
        }
      });
    })
    .put(function(req,res){
      Superhero.findById(req.params.superhero_id, function(err, hero){

        if (!hero) return res.status(404); //only in node.  404 is not found
        hero.loadPower(req.body.superPower);
        hero.loadData(req.body);
        hero.save(function(e){
          if (e) {
            res.send(e) //This is an internal server error
          } else {
            res.json({ hero, message: "Hero updated" });
          }
        })
      })
    })
    .get(function(req,res){
      Superhero.findById(req.params.superhero_id, function(err,data){
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      });
    });

module.exports = Router;
