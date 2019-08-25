$(document).ready(function() {
  $(".modal").modal();

  //Scrape handler
  function handleScraping(event) {
    //
    event.preventDefault();
    //Scrape articles
    $("#scrape-articles").on("click", handleScraping);
    $.ajax({
      type: "GET",
      data: author,
      url: "/scrape"
    }).then(function(response) {
      console.log(response);
      $(".nav-mobile").append(
        " <a class=" +
          "waves-effect waves-light btn modal-trigger" +
          " href=" +
          "#modal1>You have 10 articles!</a" +
          ">"
      );
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
});
