var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
var fs = require("fs");

/*============================
  MySQL DATABASE CONNECTION
=============================*/

var connection = mysql.createConnection ({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "toor1234",
  database: "michelin_restaurantDB",
});


connection.connect(function (err){

  if (err) {
    console.log(err);
  } 
});
/*================================*/

var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.text());
app.use(
  bodyParser.json({
    type: "application/vnd.api+json"
  })
);

/*
Routes
*/

app.get("/", function(req, res) {
  // send index.html
  res.sendFile(path.join(__dirname, "index.html"));
  fs.readFile("count", "utf8", function(error, data) {
    var count = parseFloat(data);

    fs.writeFile("count", count + 1, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    console.log(data);
  });
});

app.get("/assets/reserve.js", function(req, res) {
  // send reserve.js
  res.sendFile(path.join(__dirname, "assets/reserve.js"));
});

app.get("/assets/tables.js", function(req, res) {
  // send reserve.js
  res.sendFile(path.join(__dirname, "assets/tables.js"));
});

app.get("/tables", function(req, res) {
  // send tables.html
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  // send reserve.html
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
  // send tables json
  connection.query(`SELECT * from reservations WHERE reservation = 1;`, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      res.json(response)
      };
    });
});

app.get("/api/waitlist", function(req, res) {
  // send tables json
  res.send("Waitlist JSON here");
});

app.get("/api/count", function(req, res) {
  // send visitor count
  fs.readFile("count", "utf8", function(error, data) {
    var count = parseFloat(data);
    res.send(data);
  });
});

app.post("/api/tables", function(req, res) {
  //creates reservation
  console.log(req.body);

  //Are tables available?

  res.send(true); //If tables available
  //res.send(false); //if not send, put on waitlist
});

app.post("/api/clear", function(req, res) {
  //clears table
});

//Listener
app.listen(port, function() {
  console.log("App listening on port " + port);
});



/*========================================
  RESERVATION CREATION
==========================================*/
  function Reservation (custName, phone, email, dinerNum) {
    this.custName = custName,
    this.phone = phone,
    this.email = email,
    this.dinerNum = dinerNum,
    this.add = function () {

      var sqlStatement = "INSERT INTO reservations (cust_name, cust_phone, cust_email, diner_number) VALUES ('" + custName + "', '" + phone + "', " + email + ", " + dinerNum + ")";

      connection.query(sqlStatement, function (err,response) {

        if(err) {
          console.log(err);
        } 
    
      }); 
    }
    
  }

  $(".submit").on("click", function(){

    var newReservation = {
      customerName: $('#res_name').val().trim(),
      phoneNumber: $('#res_phone').val().trim(),
      customerEmail: $('#res_email').val().trim(),
      dinerNumber: $('#res_diners').val().trim(),
    };

    
    var custReservation = new Reservation(
      newReservation.customerName, 
      newReservation.phoneNumber, 
      newReservation.customerEmai, 
      newReservation.dinerNumber
    );

    custReservation.add();

}); 

/*=============================================*/

