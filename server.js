/*Heroku deployed link
https://git.heroku.com/intense-shelf-96544.git*/
/*Created mongolab-contoured-49462 as MONGODB_URI*/

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scrapedarticlesdb", {
  useNewUrlParser: true
});

//Get a route for scraping pbsnewshour
app.get("/scrape", function(res, req) {
  //grab the body of the HTML with axios
  axios.get("https://www.pbs.org/newshour/latest").then(function(response) {
    //Load the body into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    //Now we grab every div.card-timeline__intro inside articles tag.
    $("articles div.card-timeline__intro").each(function(i, element) {
      //empty result object for adding new records to db
      var result = {};
      //add title, summary and link of article to the results object.
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("p")
        .text();
      //create a new article from the results object built by scraping.
    });
  });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
