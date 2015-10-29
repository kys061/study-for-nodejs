'use strict';

var express = require('express');
var controller = require('./boxinfo.controller');

var router = express.Router();

//show
app.get('/boxinfo', function(req, res){
  Boxinfo.find(function(err, doc){
    res.send(doc);
  })
})

//add
app.post('/boxinfo', function(req, res){
  console.log(req.body);
  Boxinfo.create(req.body, function(err, boxinfo){
    if(err) { return handleError(res, err); }
    return res.json(201, boxinfo);
  })
})

//delete
app.delete('/:boxname', function(req, res) {
  console.log(req.params.boxname);
  var query = Boxinfo.where({ boxname: req.params.boxname})
  query.findOneAndRemove(function(err, boxinfo) {
    if (err) return handleError(err);
    if (boxinfo) console.log(boxinfo);
  })
})
