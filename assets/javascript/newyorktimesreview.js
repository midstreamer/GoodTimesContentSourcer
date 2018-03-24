document.ready(function() {



contentIndex = 0;

var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
            url += '?' + $.param({
                'api-key': "386607bb9b9e4ed39bea6265563b90a3",
                'query': queryInput
            });
            $.ajax({
                url: url,
                method: 'GET',
            })
                                // We store all of the retrieved data inside of an object called "response"
                .then(function (result) {
                                // Log the resulting object
                    console.log(result);
                    for (var i = 0; i < result.results.length; i++) {
                                // Transfer content to HTML
                        $("#title"+contentIndex+"").html(result.results[i].display_title);
                                // $(".title").text("Title: " + result.results[0].headline);
                        $("#content"+contentIndex+"").html(result.results[i].summary_short);

                                // return the default library picture if no multimedia exists in JSON object
                        if (result.results[i].multimedia === null) {
                            console.log("no multimedia exists");
                        $("#cardImg"+contentIndex+"").attr("src","./assets/images/bookstore-slide-2MCD-superJumbo.jpg");

                        } else {

                            $("#cardImg"+contentIndex+"").attr("src", result.results[i].multimedia.src);
                        }
                                // $(".snippet").text("Article Snippet: " + result.results[0].summary_short);
                                // $(".pubDate").text("Rating: " + result.results[0].mpaa_rating);

                        contentIndex++;
                        console.log(contentIndex);
                    }
                });
                }
      