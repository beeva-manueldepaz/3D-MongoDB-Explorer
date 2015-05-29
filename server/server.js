var express = require('express');
var mongodb = require('mongodb');
var app = express();

var MONGODB_URI = 'mongodb://127.0.0.1:27017/salamandra';
var db;

// Initialize connection once
mongodb.MongoClient.connect(MONGODB_URI, function(err, database) {

    if (err) { console.log('no mongoDB'); }

    else {

        db = database;
        var server = app.listen(3001, function () {

            var host = server.address().address;
            var port = server.address().port;

            console.log('Example app listening at http://%s:%s', host, port);
        });
    }
});

app.get('/collection/:id', function(req, res) {

    var id = req.params.id;

    db.collection(id).find({},{limit:10}, function(err, docs) {
        docs.each(function(err, doc) {
            if(doc) {
                res.write(JSON.stringify(doc) + "\n");
            }
            else {
                res.end();
            }
        });
    });
});

app.get('/collections', function (req, res) {
    res.send('Hello World!');
});