var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/teststudents');

//申明一个mongoons对象
var StudentsSchema = mongoose.Schema({
  name: String,
  no: Number,
  age: Number,
  createAt: {
    type: Date,
    default: Date.now()
  }
})



//每次执行都会调用,时间更新操作
// StudentsSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this.meta.createAt = Date.now();
//   } 

//   next();
// })

//查询的静态方法
StudentsSchema.statics = {
  fetch: function (cb) { //查询所有数据
    return this
      .find()
      .exec(cb) //回调
  },
  findById: function (id, cb) { //根据id查询单条数据
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}

var Students = mongoose.model('Students', StudentsSchema) // 编译生成Movie 模型

// Students.fetch(function (err, students) {
//   if (err) console.log(err)
//   console.log({ students: students })  //这里也可以json的格式直接返回数据res.json({data: users});
// });

Students.findById('58341a8cacf92f387a5b8b07', function (err, stu) {
  if(err) console.log(err)
  console.log({ student : stu})
})




// Students.find({}, function (err, students) {
//   if (err) console.log(err);
//   console.log(students)
// })

// var newStudent = new Students({ name: 'Silence' });
// console.log(newStudent.name);