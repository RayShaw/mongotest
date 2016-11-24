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
mongoose.Promise = global.Promise;

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

// add new student 基于实例entity操作
// studentEntity.save(function(err) {
//     if (err) console.error(err);
//     console.log('Entiry add new success.')
//     db.close()
// })

// add 基于model操作
var newStu2 = { no: 6, name: 'bbbb', age: '20' };
// studentModel.create(newStu2, function(err){
//     if(err) console.error(err)
//     console.log('Model add new success.')
//     db.close()
// });

// update 基于Model操作 Model.update(condition, update, options, callback)
var condition = { no: 1 }
var update = { $set: { name: 'vvvvv', age: 18 } }
var options = { upsert: true }
// studentModel.update(condition, update, options, function(err) {
//     if (err) console.error(err)
//     console.log('Model update success')
//     db.close()
// })

// update 基于Entity操作 db.close()后就无法entity操作
var _id = '58354620ccfd690c4615825a'
// studentModel.findById(_id, function(err, student) {
//     if(err) console.error(err) 
//     student.name = 'uuuuu2'
//     student.save(function(err) {
//         if (err) console.error(err);
//         console.log('Entiry update new success.')
//     })
//     db.close()
// })



// delete 基于Model操作
var conditionDel = { no: 2 }
// studentModel.remove(conditionDel, function(err){
//     if(err) console.error(err)
//     console.log('delete success')
//     db.close()
// })

// find
studentModel.find(function(err, students) {
    if (err) console.erroe(err)
    console.log({ students: students })
    db.close() // 加了 entity的save失效
})


// findbyno 基于实例方法查询
// var stuUpdEntity = new studentModel({});
// stuUpdEntity.findbyno(2, function(err, result) {
//     if (err) console.error(err)
//     console.log(result)
// })

// // findbyname 基于静态方法查询
// studentModel.findbyname('ccccc', function(err, result) {
//     if (err) console.error(err)
//     console.log(result)
// })


// studentModel.findById('58341a8cacf92f387a5b8b07', function(err, students) {
//     if (err) console.erroe(err)
//     console.log({ student: students })
//     db.close()
// })
