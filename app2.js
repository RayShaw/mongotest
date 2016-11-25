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
for (let i = 0; i < 100; i++) {
  let newStu = {
    no: i,
    name: 'wocao' + i,
    age: parseInt(Math.random() * 100)
  }
  newStuArr.push(newStu)
}

// add
studentModel.create(newStuArr, function (err) {
  if (err) console.error(err)
  console.log('Model add new success.')

  // delete no. is even records
  studentModel.find({}, { no: 1, _id: 1 }, null, function (err, students) {
    if (err) console.erroe(err)
    let deleteStu = []
    for (let stu of students) {
      if (stu.no % 2 == 0) {
        deleteStu.push(stu._id)
      }
    }
    studentModel.remove({ _id: { $in: deleteStu } }, function (err, results) {
      if (err) console.log(err);
      console.log('Model delete success.')

      // update sex filed  no < 20 female
      studentModel.update({ no: { $lt: 20 } }, { sex: 'female' }, { multi: true }, function (err) {
        if (err) console.error(err)
        console.log('Model update success.')

        // find distinct 
        studentModel.distinct("age", { age: { $gt: 70 } }, function (err, studentsAge) {
          if (err) console.erroe(err)
          console.log({ studentsAge: studentsAge })
          db.close() 
        })

        //find
        studentModel.find({ no: { $lte: 10 } }, { no: 1, sex: 1 }, function (err, results) {
          if (err) console.error(err)
          console.log(results)
          db.close();
        })
      })


    });
  })



})

// studentModel.find({ no: { $lte: 10 } }, { _id: 1, no: 1 }, function (err, results) {
//     if (err) console.error(err)
//     console.log(results)
//   })

// delete no. is even records
// studentModel.find({}, { no: 1, _id: 1 }, null, function (err, students) {
//   if (err) console.erroe(err)
//   let deleteStu = []
//   for(let stu of students){
//     if (stu.no % 2 == 0){
//         deleteStu.push(stu._id)
//     }
//   }

//   studentModel.remove({_id: {$in: deleteStu}}, function(err, results) {
//     if(err) console.log(err);

//   });
//   db.close()
// })


// add sex filed 50 > no > 20 male, no < 20 female
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
// studentModel.distinct("age", { age: { $gt: 70 } }, function (err, studentsAge) {
//   if (err) console.erroe(err)
//   console.log({ studentsAge: studentsAge })
//   db.close() // 加了 entity的save失效
// })



