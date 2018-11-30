var express = require('express');
var app = express();
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

//Models
var PostModel = mongoose.model('newPosts', postSchema);
var UserModel = mongoose.model('users', userSchema);

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

//+++++++++++++++++++++++++++
// FOR RUNNING ON THE SERVER
// app.use("/", express.static(path.join(__dirname, "angular")));

// app.get('/', function(req, res){
// res.sendFile(path.join(__dirname, "angular", "index.html"));
// })
//+++++++++++++++++++++++++++

//Initial request
app.get("/", function (req, res) {
  res.send("Connected to server");
})

//CREATE POST
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

//CREATE USER
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

//DELETE POST VIA ID
app.delete('/api/posts/:id', function (req, res) {
  PostModel.deleteOne({
      _id: req.params.id
    },
    function (err) {});
})

//GET POST VIA ID
app.get('/api/posts/:id', function (req, res) {
  PostModel.find({
      _id: req.params.id
    },
    function (err, data) {
      res.json(data);
    });
});

//UPDATE POST
app.put('/api/posts/:id', function (req, res) {
  PostModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    res.json(post);
  });
})

//GET POSTS
app.get('/api/posts', function (req, res) {
  PostModel.find(function (err, data) {
    res.json(data);
  });

})

//GET USERS
app.get('/api/users', function (req, res) {
  UserModel.find(function (err, data) {
    res.json(data);
  });

})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})