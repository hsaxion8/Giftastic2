$(document).ready(function () {

  var topics = ["Iron Man", "Captain America", "Black Panther", "Ant Man", "Thor", "Hulk", "Gamora", "Loki", "Thanos", "Spiderman"]


  function makeButtons() {

    $("#marvelButtons").empty();

    for (i = 0; i < topics.length; i++) {

      var b = $("<button>");

      b.addClass("marvelBtn");
      b.attr("data-name", topics[i]);
      b.text(topics[i]);

      $("#marvelButtons").append(b);
    };
  };

  $("#add-movies").on("click", function (event) {

    event.preventDefault();

    var character = $("#marvel-input").val().trim();

    topics.push(character);
    $("#marvel-input").val("");

    makeButtons();

    console.log(topics);
  });

  makeButtons();


  function displayGifs() {

    var movieName = $(this).attr("data-name");
    var movieStr = movieName.split(" ").join("+");
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + movieStr + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: giphyURL,
      method: "GET"
    }).done(function (response) {

      console.log(giphyURL);
      console.log(response);

      results = response.data;

      $("#gifs").empty();
      for (var i = 0; i < results.length; i++) {

        var movieDiv = $("<div>");
        var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
        var movieImage = $("<img>");

        para.addClass("rating-text")

        movieImage.addClass("image-gifs")
        movieImage.attr("src", results[i].images.fixed_height_still.url);
        movieImage.attr("data-state", "still");
        movieImage.attr("data-position", i);

        movieDiv.append(para);
        movieDiv.append(movieImage);
        movieDiv.addClass("individual-gifs")

        $("#gifs").prepend(movieDiv);

      };
    });

  };

  $(document).on("click", ".marvelBtn", displayGifs);



  function gifAnimation() {
    var state = $(this).attr("data-state");
    var position = $(this).attr("data-position");
    position = parseInt(position);

    console.log(results[position].images.fixed_height.url);
    console.log(position);

    if (state === "still") {
      console.log("we're here");
      $(this).attr("src", results[position].images.fixed_height.url);
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", results[position].images.fixed_height_still.url);
      $(this).attr("data-state", "still");
    }
  };

  $(document).on("click", ".image-gifs", gifAnimation);

}); 