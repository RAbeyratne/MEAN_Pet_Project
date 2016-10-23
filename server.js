// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var db = mongojs('meanpetproject', ['meanpetproject']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/getInitialData', function (req, res) {
    console.log('Server [page load] hit ~~~');
    var dataToSend;
    db.meanpetproject.find(function(err, docs){
        dataToSend = docs;
      res.send(dataToSend);
    });
});

app.get('/getpart/:id', function (req, res) {
    var id = req.params.id;
    console.log('Retrieving => ' + id);
    db.meanpetproject.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.post('/addpart', function (req, res) {
    var partToAdd = req.body;
    console.log(partToAdd.part_name);
    console.log(partToAdd.unit_price);
    console.log(partToAdd.units_available);
    db.meanpetproject.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/deletepart/:id', function (req, res) {
    var id = req.params.id;
    console.log('Deleting => ' + id);
    db.meanpetproject.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/updatepart/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.meanpetproject.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {part_name: req.body.part_name, unit_price: req.body.unit_price, units_available: req.body.units_available}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

app.listen(3000);
console.log("MeanPetProject running on port 3000");