
var express = require('express');
var app = express();
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
    user: String
})
var PostModel = mongoose.model('newPosts', postSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.image);
    console.log(req.body.user);

    PostModel.create({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        user: req.body.user
    });


})

app.delete('/api/posts/:id', function(req,res){
    PostModel.deleteOne({ _id: req.params.id },
    function (err) {});
    })
    

app.get('/api/posts', function(req, res){

    PostModel.find(function(err, data){
        res.json(data);
    });
 
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})