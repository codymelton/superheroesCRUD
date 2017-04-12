var express = require('express');
var Router = express.Router();
var Superhero = require('../models/superhero')

Router.route('/')
  .get(function(req,res){
    Superhero.find(function(err, data){
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  })
  .post(function(req,res){
    var newSuper = new Superhero();
    newSuper.loadPower(req.body.superPower);
    newSuper.loadData(req.body);
    newSuper.save(function(err,data){
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  Router.route('/:superhero_id')
    .delete(function(req,res){
      Superhero.remove({_id: req.params.superhero_id}, function(err){
        if (err) {
          console.log(err);
        } else {
          res.send("Super hero was 💩🛢'd")
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
            res.status(500).send(e) //This is an internal server error
          } else {
            res.json(hero);
          }
        })
      })
    })
    .get(function(req,res){
      Superhero.findById(req.params.superhero_id, function(err,data){
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      });
    });

module.exports = Router;
