
var express = require('express')
var http = require("http");
var path = require("path");
var db = require('./db');
var dbLink=require("./json/config.json");
var url = dbLink.devServer.url;
var app = express();
var publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));

app.use(require('./routers/getMenuItems'));

db.connect(url, function(err) {
	if (err) {
		console.log('Unable to connect to Mongo.');
		process.exit(1)}
	else {
		app.listen(3000, function() {
		console.log('Listening on port 3000...')
	})};
});

app.get('/', function (req, res) {
	console.log("Coming a request!");
	res.sendFile(`${publicPath}/main.html`);
});

app.get('/main', function (req, res) {
	console.log("Coming a main request!");
	res.sendFile(`${publicPath}/main.html`);
});

app.get('/menu', function (req, res) {
	console.log("Coming a menu request!");
	res.sendFile(`${publicPath}/menu.html`);
});

app.get('/cart', function (req, res) {
	console.log("Coming a cart request!");
	res.sendFile(`${publicPath}/cart.html`);
});

app.get('/signup', function (req, res) {
	console.log("Coming a signup request!");
	res.sendFile(`${publicPath}/signup.html`);
});

app.listen(3000, function() {
console.log("Example app listening on port 3000!");
});