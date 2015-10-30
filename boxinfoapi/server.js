var express = require("express");
var http = require('http');
var faker = require('faker');
var cors = require("cors");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var Boxinfo = require('./db').Boxinfo


var jwtSecret = 'dfaskdjfk123/fasdkj4kjf';

var user = {
  username: 'admin',
  password: 'admin'
};

var app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({
  secret: jwtSecret
}).unless({ path: [ '/login'] }));

app.get('/boxinfo', function(req, res){
  Boxinfo.find(function(err, doc){
    res.send(doc);
  })
})

app.get('/random-user', function(req, res){
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
})

app.post('/login', authentication, function(req, res){
  var token = jwt.sign({
    username: user.username
  }, jwtSecret);
  res.send({
    token: token,
    user: user
  });
})

app.get('/me', function(req, res){
  res.send(req.user);
})

app.post('/boxinfo', function(req, res){
  console.log(req.body);
  Boxinfo.create(req.body, function(err, boxinfo){
    if(err) { return handleError(res, err); }
    return res.json(201, boxinfo);
  })
})

app.delete('/:boxname', function(req, res) {
  console.log(req.params.boxname);
  var query = Boxinfo.where({ boxname: req.params.boxname})
  query.findOneAndRemove(function(err, boxinfo) {
    if (err) return handleError(err);
    if (boxinfo) console.log(boxinfo);
    return res.json(201, boxinfo);
  })
})

var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port)
})

var io = require('socket.io')(server);

// when client is coneect, define on and emit
io.on('connection', function(socket) {
  console.log('client connected...');

// socket.on

})

//UTIL

function authentication(req, res, next){
  var body = req.body;
  if(!body.username || !body.password) {
    res.status(400).end('Must provide username or password');
  }
  if (body.username !== user.username || body.password !== user.password){
    res.status(401).end('Username or Password is incorrect')
  }
  next();
}

function handleError(response){
  console('Error : ' + response.data)
  // console.log(response);
}
