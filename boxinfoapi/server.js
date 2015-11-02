    var express = require("express");
    var http = require('http');
    var faker = require('faker');
    var cors = require("cors");
    var bodyParser = require('body-parser');
    var jwt = require('jsonwebtoken');
    var expressJwt = require('express-jwt');
    var Boxinfo = require('./db').Boxinfo
    var Users = require('./db').Users


    var jwtSecret = 'dfaskdjfk123/fasdkj4kjf';

    /*var user = {
      username: 'admin',
      password: 'admin'
    };*/

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
        console.log("loginusername : "+req.body.username);
        Users.findOne({ username: req.body.username }, function(err, loginuser){
            if (err) throw err;
            console.log(loginuser);
            var token = jwt.sign({
                username: loginuser.username
            }, jwtSecret);
            res.send({
                token: token,
                user: loginuser
            });
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

    /*var io = require('socket.io')(server);

    // when client is coneect, define on and emit
    io.on('connection', function(socket) {
      console.log('client connected...');

    // socket.on

    })*/

    //UTIL

    function authentication(req, res, next){
      var body = req.body;
      if(!body.username || !body.password) {
        res.status(400).end('Must provide username or password');
      }
        // find user
        Users.findOne({ username: body.username }, function(err, loginuser) {
        //    console.log(err);
            if (err) throw err;

            console.log(loginuser);
                //res.status(401).end('Username or Password is incorrect')
                // check match password
                loginuser.comparePassword(body.password, function (err, isMatch) {
                    if (err) throw err;

                    //console.log(isMatch);
                    if (isMatch){
                        next();
                    }else{
                        console.log(body.password + " : ", isMatch); // -&gt; Password123: true
                        res.status(401).end('Password is incorrect')
                    }
                });
        });
    }

    function handleError(response){
      console('Error : ' + response.data)
      // console.log(response);
    }


    // ==========================================================================


     //create a user a new user
     /*var testUser = new Users({
         username: "test",
         password: "test"
     });

    var adminUser = new Users({
        username: "admin",
        password: "admin"
    })*/
     //save user to database
     /*adminUser.save(function(err) {
         if (err) throw err;*/

    // fetch user and test password verification
    /*Users.findOne({ username: adminUser.username }, function(err, user) {
        if (err) throw err;

        //console.log(user);

        //console.log(user.comparePassword(adminUser.password));
        // test a matching password
        user.comparePassword(adminUser.password, function(err, isMatch) {
            if (err) throw err;
            console.log(adminUser.password + " : ", isMatch); // -&gt; Password123: true
        });

        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -&gt; 123Password: false
        });
    })*/
     //});
