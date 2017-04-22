var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.get("/", function(req, res) {
  // send index.html
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  // send tables.html
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  // send reserve.html
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.listen(port, function() {
  console.log("App listening on port " + port);
});