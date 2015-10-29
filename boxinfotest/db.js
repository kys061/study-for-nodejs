var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/netbox') // 주소/DB이름

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected')
})

var boxScheme = {
    license:String,
    boxtype:String,
    boxname:String,
    boxip:String,
    boxgateway:String
}

exports.Boxinfo = mongoose.model('Boxinfo', boxScheme, 'boxinfo') // 변수 이름(디비에 접근할), 스키마(접근할 디비의 스키마), 컬렉션 이름.
