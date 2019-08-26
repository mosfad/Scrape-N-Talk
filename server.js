/*Heroku deployed link
https://git.heroku.com/intense-shelf-96544.git*/
/*Created mongolab-contoured-49462 as MONGODB_URI*/

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

//Get a route for scraping pbsnewshour
app.get("/scrape", function(req, res) {
  //grab the body of the HTML with axios
  axios.get("https://www.pbs.org/newshour/latest").then(function(response) {
    //Load the body into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    //console.log($(this));
    //Now we grab every div.card-timeline__intro inside articles tag.
    $("article div.card-timeline__intro").each(function(i, element) {
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
      console.log(result);
      //create a new article from the `result` object built by scraping.
      //HOW TO PREVENT DATABASE FROM CREATE DUPLICATE RECORDS.
      db.Article.create(result)
        .then(function(dbArticle) {
          //view the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          //log any error found
          console.log(err);
        });
    });
    db.Article.find({})
      .then(function(dbArticle) {
        //send articles back to the client if found
        console.log(dbArticle);
        res.render("index", { Articles: dbArticle });
      })
      .catch(function(err) {
        //log any error found
        console.log(err);
      });
  });
});

//Route for getting all articles from the database
app.get("/articles", function(res, req) {
  db.Article.find({})
    .then(function(dbArticle) {
      //send articles back to the client if found
      res.render("index", { Articles: dbArticle });
    })
    .catch(function(err) {
      //log any error found
      console.log(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
