$(document).ready(function() {
  $(".modal").modal();

  //Scrape handler
  function handleScraping(event) {
    //prevents submit button from submitting a form.
    event.preventDefault();
    //Scrape articles
    $.ajax({
      type: "GET",
      url: "/scrape"
    }).then(function(response) {
      //WHY DOES RESPONSE ALS CONTAIN HTML TAGS FROM index.handlebars???=========================================
      console.log(response);
    });
  }

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
});
