var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  /* TODO:
   * Add three entries into our schema. These should be:
   *

   * 1: title of article: A required string that will be trimmed.*/
  title: {
    type: String,
    trim: true,
    required: true
  },
  /* 2: url link of article: A required string that will be trimmed.*/
  link: {
    type: String,
    trim: true,
    required: true
  },
  /* 3: summary of article: A required string that will be trimmed.*/
  summary: {
    type: String,
    trim: true,
    required: true
  }
  /* 4: userCreated: A date that will default to the current date.
  userCreated: {
    type: Date,
    default: Date.now
  }*/
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
