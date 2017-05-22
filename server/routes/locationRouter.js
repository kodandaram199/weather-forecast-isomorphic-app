const express = require('express');
const locationRouter  = express.Router();

const mongoose = require('mongoose');
const Verify = require('./verify');

const User = require('../models/user');

locationRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){

    User.find({username: req.decoded._doc.username}, function(err, location){
      if(err){
        throw err;
      }
      if(location[0])
        res.json(location[0].locations);
      else
        res.json({});
  });

})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {

    User.findById(req.decoded._doc._id, function (err, location) {
        if (err) throw err;
        let isExist = false;
        let count = 0;
        if(location) {
          for(let i=0; i< location.locations.length; i++){
            console.log("locations are", location.locations[i]);
            if(req.body.location === location.locations[i].location) {
              isExist = true;
              count = location.locations[i].count+1;
              location.locations.id(location.locations[i]._id).remove();
              location.locations.push({"location": req.body.location, "count": count});
              location.save(function (err, result) {
                if (err) throw err;
              });
            }
          }
        }

        if(isExist){
            res.json({"isExists": true});
        }
      if(!isExist || !location.locations){
            location.locations.push(req.body);
            location.save(function (err, result) {
                if (err) throw err;
                res.json({"saved": true});
            });
        }

    });
});

locationRouter.route('/favorites')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){

        User.find({username: req.decoded._doc.username}, function(err, location){
            if(err){
                throw err;
            }
            res.json(location[0].favorites);
        });

    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {

        User.findById(req.decoded._doc._id, function (err, location) {
            if (err) throw err;
            let isExist = false;
            let count = 0;

            for(let i=0; i< location.favorites.length; i++){
                console.log("locations are", location.favorites[i]);
                if(req.body.location === location.favorites[i].location) {
                    isExist = true;
                }
            }

            if(isExist){
                res.json({"isExists": true});
            }else{
                location.favorites.push(req.body);
                location.save(function (err, result) {
                    if (err) throw err;
                    res.json({"saved": true});
                });
            }

        });
    });

module.exports = locationRouter;
