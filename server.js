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
    var dataToSend;
    db.meanpetproject.find(function(err, docs){
        dataToSend = docs;
      res.send(dataToSend);
    });
});

app.post('/addPart', function (req, res) {
    var partToAdd = req.body;
    console.log(partToAdd.part_name);
    console.log(partToAdd.unit_price);
    console.log(partToAdd.units_available);
    db.meanpetproject.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.listen(3000);
console.log("MeanPetProject running on port 3000");