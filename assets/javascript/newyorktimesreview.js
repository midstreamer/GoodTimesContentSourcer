$(document).ready(function() {

    contentIndex = 0;
    var queryInput = "War Dogs";

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
                         $("#NytTitle"+contentIndex+"").html(result.results[i].headline);
                                 // $(".title").text("Title: " + result.results[0].headline);
                         $("#NytContent"+contentIndex+"").html(result.results[i].summary_short);

                                 // return the default library picture if no multimedia exists in JSON object
                         if (result.results[i].multimedia === null) {
                             console.log("no multimedia exists");
                         $("#NytImg"+contentIndex+"").attr("src","./assets/images/bookstore-slide-2MCD-superJumbo.jpg");

                         } else {

                             $("#NytImg"+contentIndex+"").attr("src", result.results[i].multimedia.src);
                         }
                                 // $(".snippet").text("Article Snippet: " + result.results[0].summary_short);
                                 // $(".pubDate").text("Rating: " + result.results[0].mpaa_rating);

                         contentIndex++;
                         console.log(contentIndex);
                     }
    

// contentIndex = 0;
// var queryInput = "War Dogs movie 2016";

// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//             url += '?' + $.param({
//                 'api-key': "386607bb9b9e4ed39bea6265563b90a3",
//                 'q': queryInput
//             });
//             $.ajax({
//                 url: url,
//                 method: 'GET',
//             })
//                                 // We store all of the retrieved data inside of an object called "response"
//                 .then(function (result) {
//                     var searchInfo = result.response.docs[i];
//                                 // Log the resulting object
//                     console.log(result);
                    
//                     console.log("headline =", result.response.docs[i])
//                     for (var i = 0; i < result.response.docs.length; i++) {
//                                 // Transfer content to HTML
//                         $("#NytTitle"+contentIndex+"").html(result.response.docs[i].headline.main);
//                                 // $(".title").text("Title: " + result.results[0].headline);
//                         $("#NytContent"+contentIndex+"").html(result.response.docs[i].snippet);

//                                 // return the default library picture if no multimedia exists in JSON object
//                         if (result.response.docs[i].multimedia === null) {
//                             console.log("no multimedia exists");
//                         $("#NytImg"+contentIndex+"").attr("src","./assets/images/bookstore-slide-2MCD-superJumbo.jpg");

//                         } else {

//                             $("#NytImg"+contentIndex+"").attr("src", "https://static01.nyt.com/"+result.response.docs[i].multimedia[0].url);
//                         }
//                                 // $(".snippet").text("Article Snippet: " + result.results[0].summary_short);
//                                 // $(".pubDate").text("Rating: " + result.results[0].mpaa_rating);

//                         contentIndex++;
//                         console.log(contentIndex);
//                     }
                });
                });
      