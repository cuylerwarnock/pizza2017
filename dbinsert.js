var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbLink=require("./json/config.json");
var url= dbLink.dbServer.url;

MongoClient.connect(url, function(err, db) {
	//function(err, db) : call back funtion : after we connect the server this server runs
	assert.equal(null, err);
	//check whether there is error or not. asser keeps silence if equa() return true
	var collection=db.collection('users');
	collection.insert(
		{name:"Cuyler Warnock",pwd:"password",phone:"4784453344"},
		function(err, result) {
			assert.equal(null, err);
			console.log("Success: "+result.insertedCount);
			db.close();
		});
});