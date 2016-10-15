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
  // part1 = {
  //   stock_number: '1',
  //   part_name: 'Mazda 323 - 2000 front headlight',
  //   unit_price: '29.99',
  //   units_available: '5'
  // };
  // part2 = {
  //   stock_number: '2',
  //   part_name: 'Suzuki Alto - 2002 660 cc engine ',
  //   unit_price: '1099.99',
  //   units_available: '2'
  // };
  // part3 = {
  //   stock_number: '3',
  //   part_name: 'B segment car break pad set (x4)',
  //   unit_price: '10.99',
  //   units_available: '45'
  // };
  // part4 = {
  //   stock_number: '4',
  //   part_name: 'Toyota Belta - 2008 CVT gearbox',
  //   unit_price: '699.99',
  //   units_available: '7'
  // };
  // var partList = [part1, part2, part3, part4];

  db.meanpetproject.find(function(err, docs){
    console.log("Sending initial data from server ~~~");
    res.send(docs);
  });

});

app.listen(3000);
console.log("MeanPetProject running on port 3000");