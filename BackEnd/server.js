var express = require('express');
var multer = require('multer');
var app = express();
var app1 = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin:admin12@ds137863.mlab.com:37863/mongo_database';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
var postSchema = new Schema({
  title: String,
  description: String,
  image: String,
  user: String,
  avatar: String
})

var userSchema = new Schema({
  username: String,
  password: String,
  image: String
})

var imageSchema = new Schema({
    image: String,
  })

var PostModel = mongoose.model('newPosts', postSchema);
var UserModel = mongoose.model('users', userSchema);
var ImageModel = mongoose.model('image', imageSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/posts', function (req, res) {
  console.log("post successful");
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.image);
  console.log(req.body.user);
  console.log(req.body.avatar);

  PostModel.create({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    user: req.body.user,
    avatar: req.body.avatar
  });
  res.send("post added");

})

app.post('/api/images', function (req, res) {
    console.log("image posted");
    console.log(req.body.image);
  
    ImageModel.create({
      image: req.body.image,
    });
  })

app.post('/api/users', function (req, res) {
  console.log("user created");
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.image);

  UserModel.create({
    username: req.body.username,
    password: req.body.password,
    image: req.body.image,
  });
  res.send("user added");

})

app.delete('/api/posts/:id', function (req, res) {
  PostModel.deleteOne({
      _id: req.params.id
    },
    function (err) {});
})

app.get('/api/posts/:id', function (req, res) {
  PostModel.find({
      _id: req.params.id
    },
    function (err, data) {
      //   if (err)
      //     return handleError(err);
      res.json(data);
    });
});

app.put('/api/posts/:id', function (req, res) {
  PostModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    // if (err) return next(err);
    res.json(post);
  });
})

app.get('/api/posts', function (req, res) {

  PostModel.find(function (err, data) {
    res.json(data);
  });

})


app.get('/api/users', function (req, res) {

  UserModel.find(function (err, data) {
    res.json(data);
    console.log(data[0].username);
  });

})




var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})