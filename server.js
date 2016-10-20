// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var db = mongojs('meanpetproject', ['meanpetproject']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/getInitialData', function (req, res) {
  console.log('Server hit ~~~');
  db.meanpetproject.find(function(err, docs){
    console.log("Sending initial data from server ~~~");
    res.send(docs);
  });
});

app.post('/addPart', function (req, res) {
  console.log('Testb hit');
  // db.meanpetproject.find(function(err, docs){
  //   console.log("Sending initial data from server ~~~");
  //   res.send(docs);
  // });
});

app.listen(3000);
console.log("MeanPetProject running on port 3000");