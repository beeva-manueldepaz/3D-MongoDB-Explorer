var express = require('express');
var mongodb = require('mongodb');
var _       = require('lodash');

var app = express();

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code;
    //BSON = require('mongodb').pure().BSON;


var db = new Db('test', new Server('localhost', 27017));

// Establish connection to db
db.open(function(err, db) {

    if (err) { console.log('no mongoDB'); }

    else {

        //db = database;
        var server = app.listen(3001, function () {

            var host = server.address().address;
            var port = server.address().port;

            console.log('Example app listening at http://%s:%s', host, port);
        });
    }
});

app.get('/', function (req, res) {

    // Use the admin database for the operation
    var adminDb = db.admin();

    // List all the available databases
    adminDb.listDatabases(function(err, dbs) {

        if (err) { res.status(500).send([]); }
        else {

            var listDbs = [];
            _.each(dbs.databases,function(item) {
                listDbs.push(item.name);
            });

            res.status(200).send(listDbs);
        }

    });
});


app.get('/:db', function(req, res) {

    var id = req.params.db;
    var secondDb = db.db(id);

    secondDb.collections(function(err, collections) {

        if (err) { res.status(500).send([]); }
        else {
            console.log(collections);

            var listCols = [];
            _.each(collections,function(item) {
                listCols.push(item.s.name);
            });

            res.status(200).send(listCols);
        }

    });

    /*
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
    */
});

