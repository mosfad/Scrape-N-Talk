$(document).ready(function() {
  var articleId;
  //Scrape handler
  function handleScraping(event) {
    $(".modal").modal();
    //prevents submit button from submitting a form.
    event.preventDefault();
    //Scrape articles
    $.ajax({
      type: "GET",
      url: "/scrape"
    }).then(function(response) {
      console.log(response);
      //var noArticlesCard = $("#no-articles");
      //noArticlesCard.hide(); //WHY ISN'T .hide() WORKING????????????????????????????????????
      console.log("I am here..................");
      //$("#no-articles").remove();
    });
  }
  handleSavingArticle = event => {
    //prevents submit button from submitting a form.
    event.preventDefault();
    console.log(this);
    var articleId = $(this).data("id");

    $.ajax({
      type: "GET",
      url: "/articles/" + articleId
    }).then(function(response) {
      console.log(response);
      //var noArticlesCard = $("#no-articles");
      //noArticlesCard.hide(); //WHY ISN'T .hide() WORKING????????????????????????????????????
      console.log("I am here..................");
      //$("#no-articles").remove();
    });
  };
  // Grab the articles as a json
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(
        "<p data-id='" +
          data[i]._id +
          "'>" +
          data[i].title +
          "<br />" +
          data[i].link +
          "</p>"
      );
    }
  });

  //click event for scraping
  $("#scrape-articles").on("click", handleScraping);

  //click event for saving an article
  $("#new-articles").on("click", "#btn-save-article", handleSavingArticle);
});
