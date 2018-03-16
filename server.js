var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var STATUSES_COLLECTION = "statuses";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://ds125896.mlab.com:25896/heroku_mvhpk6j1", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// STATUSES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/statuses"
 *    GET: finds all statuses
 *    POST: creates a new contact
 */

app.get("/api/statuses", function(req, res) {
  db.collection(STATUSES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get status.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/statuses", function(req, res) {
  var newStatus = req.body;
  newStatus.last_update = new Date(Date.now()).toISOString();
  newStatus.creation = new Date(Date.now()).toISOString();

  if (!req.body.title) {
    handleError(res, "Invalid user input", "Must provide a title for daily status.", 400);
  }

  db.collection(STATUSES_COLLECTION).insertOne(newStatus, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new daily status entry.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/statuses/:id"
 *    GET: find status by id
 *    PUT: update status by id
 *    DELETE: deletes status by id
 */

app.get("/api/statuses/:id", function(req, res) {
});

app.put("/api/statuses/:id", function(req, res) {
});

app.delete("/api/statuses/:id", function(req, res) {
});

