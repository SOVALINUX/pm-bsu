var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;

DbProvider = function (host, port) {
  var mongoClient = new MongoClient(new Server(host, port));
  var that = this;
  mongoClient.open(function(err, mongoClient) {
    that.db = mongoClient.db("internet_shop");
  });
};


DbProvider.prototype.getCollection = function (collection, callback) {
  this.db.collection(collection, function (error, db_collection) {
    if (error) {
	  callback(error);
	} else {
	  callback(null, db_collection);
	}
  });
};

DbProvider.prototype.findAll = function (collection, callback) {
    this.getCollection(collection, function (error, db_collection) {
      if (error) {
	    callback(error);
      } else {
        db_collection.find().toArray(function (error, results) {
          if (error) {
		    callback(error);
          } else {
		    callback(null, results);
		  }
        });
      }
    });
};

DbProvider.prototype.save = function(items, collection, callback) {
    this.getCollection(collection, function(error, db_collection) {
      if (error) {
	    callback(error);
      } else {
        if (typeof (items.length) === "undefined") {
          items = [items];
		}

        db_collection.insert(items, function() {
          callback(null, items);
        });
      }
    });
};

exports.Dao = DbProvider;
