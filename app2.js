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


// add 100 records

// var newStuArr = [];
// for (let i = 0; i < 100; i++) {
//   let newStu = {
//     no: i,
//     name: 'wocao' + i,
//     age: parseInt(Math.random() * 100)
//   }
//   newStuArr.push(newStu)
// }
// studentModel.create(newStuArr, function (err) {
//   if (err) console.error(err)
//   console.log('Model add new success.')
//   db.close()
// });


// delete no. is even records
// studentModel.find({}, { no: 1, _id: 1 }, null, function (err, students) {
//   if (err) console.erroe(err)
//   let ids = []
//   for(let stu of students){
//     if (stu.no % 2 == 0){
//         ids.push(stu._id)
//     }
//   }


//   // console.log(ids)


//   studentModel.remove({_id: {$in: ids}}, function(err, results) {
//     console.log(err);

//   });
//   db.close()
// })


// add age filed 50 > no > 20 male, no < 20 female
// var condition = { no: { $gte: 20, $lte: 50 } }
// var update = { $set: { sex: 'male' } }
// var options = { multi: true }
// studentModel.update(condition, update, options, function (err) {
//   if (err) console.error(err)
//   console.log('Model update success')
//   db.close()
// })

// var condition = { no: { $lt: 20 } }
// var update = { $set: { sex: 'female' } }
// var options = { multi: true }
// studentModel.update(condition, update, options, function (err) {
//   if (err) console.error(err)
//   console.log('Model update success')
//   db.close()
// })

// find distinct 
studentModel.distinct("age", { age: { $gt: 70 } }, function (err, studentsAge) {
  if (err) console.erroe(err)
  console.log({ studentsAge: studentsAge })
  db.close() // 加了 entity的save失效
})



