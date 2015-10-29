var express = require("express");
var app = express()
var bodyParser = require("body-parser");
var multer = require('multer');

var Boxinfo = require('./db').Boxinfo

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.use('/', express.static('./'));

app.get('/boxinfo', function(req, res){
  Boxinfo.find(function(err, doc){
    res.send(doc);
  })
})

// 여기에 데이터 저장과 관련한 몽고디비 생성 쿼리 입력
app.post('/boxinfo', authentication, function(req, res){
  Boxinfo.create(req.body, function(err, boxinfo){
    if(err) { return handleError(res, err); }
    return res.json(201, boxinfo);
  })
})

//app.get('/', function(req, res){
    //res.send("index.html");
//})

var server = app.listen(3001, function(){
  console.log('server running http://localhost:' + server.address().port)
});


// UTIL

function authentication(req, res, next){
  var body = req.body;

  if(!body.boxname || !body.license || !body.boxtype || !body.boxip || !body.boxgateway) {
    res.status(400).end('Must provide all contents');
  }

  next();
  }
