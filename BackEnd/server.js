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
    content: String,
    image: String
})
var PostModel = mongoose.model('newPosts', postSchema);


//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.image);

    PostModel.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    });


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