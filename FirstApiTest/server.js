var express = require("express");
var app = express()

app.use('/', express.static('./'));

//app.get('/', function(req, res){
    //res.send("index.html");
//})

var server = app.listen(3001, function(){
  console.log('server running http://localhost:' + server.address().port)
});
