var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teststudents');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    //一次打开记录
    //console.log('connect')
});

//申明一个mongoons对象 Schema 文本属性对象
var StudentSchema = mongoose.Schema({
    no: Number,
    name: String,
    age: Number,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

// 为Schema创建方法
StudentSchema.methods.speak = function() {
    var greeting = this.name ? "My name is " + this.name : "I don't have a name"
    console.log(greeting)
}

// 发布一个Model数据库模型
var StudentModel = mongoose.model('Students', StudentSchema)

// 用Model创建Entity实体
var studentEntity = new StudentModel({ name: 'aaaa' })
// console.log(studentEntity.name)
studentEntity.speak();
// studentEntity.save(function(err, studentEntity){
//   if(err) return console.error(err);
//   studentEntity.speak();
// })



StudentModel.find(function(err, students) {
    if (err) console.erroe(err)
    console.log({ students: students })
})

StudentModel.findById('58341a8cacf92f387a5b8b07', function(err, students) {
    if (err) console.erroe(err)
    console.log({ student: students })
})
