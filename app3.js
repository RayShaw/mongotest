var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/teststudents');
var db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    //一次打开记录
    //console.log('connect')
});

var studentSchema = mongoose.Schema({
    name: String,
    no: Number,
    age: Number,
    sex: {
        type: String,
        default: 'nochoose'
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

var studentModel = mongoose.model('studentModel', studentSchema, 'stu2')


// new 100 records
let newStuArr = [];
for (let i = 0; i < 10; i++) {
    let newStu = {
        no: i,
        name: 'wocao' + i,
        age: parseInt(Math.random() * 100)
    }
    newStuArr.push(newStu)
}

// find
let query = studentModel.find({ no: { $lte: 10 } }, { no: 1, sex: 1 })

let promose = query.exec()

promose.then(function (results) {
    console.log(results);
}).catch(function (err) {
    console.error(err);
});


// let query2 = studentModel.find({ no: { $lte: 10 } }, { no: 1, sex: 1 })



//find
// studentModel.find({ no: { $lte: 10 } }, { no: 1, sex: 1 }, function (err, results) {
//     if (err) console.error(err)
//     console.log(results)
//     db.close();
// })


