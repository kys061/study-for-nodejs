var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
mongoose.connect('mongodb://localhost/simple')

var personScheme ={
    firstName:String,
    lastName:String,
    email:String
}

var Person = mongoose.model('Person', personScheme, 'people') // 변수 이름(디비에 접근할), 스키마(접근할 디비의 스키마), 컬렉션 이름.  

var app = express()

app.use(cors());
app.get('/people', function(req, res){
  Person.find(function(err, doc){
    res.send(doc);
  })
})



var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port)
})
