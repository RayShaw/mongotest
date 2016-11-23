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

// 去除 DeprecationWarning mpromise 警告
// mongoose.Promise = global.Promise;

//申明一个mongoons对象 Schema 文本属性对象
var studentSchema = mongoose.Schema({
    no: Number,
    name: String,
    age: Number,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

// 为Schema创建实例方法
studentSchema.methods.speak = function() {
    var greeting = this.name ? "My name is " + this.name : "I don't have a name"
    console.log(greeting)
}

// 创建实例方法 实例方法在Entity使用
studentSchema.methods.findbyno = function(no, callback) {
    return this.model('studentModel').find({ no: no }, callback);
}

// 创建静态方法 静态方法在Model使用
studentSchema.statics.findbyname = function(name, callback) {
    return this.model('studentModel').find({ name: name }, callback);
}

// 发布一个Model数据库模型 stu collection name
var studentModel = mongoose.model('studentModel', studentSchema, 'stu')

// 用Model创建Entity实例
var newStu = { no: 1, name: 'aaaa', age: '10' };
var studentEntity = new studentModel(newStu)
// studentEntity.speak();

// add new student 基于实例entiry操作
// studentEntity.save(function(err) {
//     if (err) return console.error(err);
//     console.log('Entiry add new success.')
//     db.close()
// })

// add 基于modul操作
var newStu2 = { no: 2, name: 'bbbb', age: '20' };
// studentModel.create(newStu2, function(err){
//     if(err) console.error(err)
//     console.log('Model add new success.')
//     db.close()
// });

// update
studentModel.update(condition, update, options, callback)
var 
var update 


// find
studentModel.find(function(err, students) {
    if (err) console.erroe(err)
    console.log({ students: students })
    db.close()
})

// studentModel.findById('58341a8cacf92f387a5b8b07', function(err, students) {
//     if (err) console.erroe(err)
//     console.log({ student: students })
//     db.close()
// })
