// pseudocode
// page 1

// A.user input for keyword search(TOMD AJAX) 
// search bar (default= Title order by popularity on search)
// 1. event listener for user input (input validation)
    //Event listener
    // var contentIndex = 0;
    // var queryInput = "";
    // $("#search").keypress(function(e) {
    //     if (e.which == 13) {
    //         event.preventDefault();
    //         queryInput = $("#search").val().trim();
    //         console.log(queryInput);
    //         $("#search").val('');
    //         contentIndex = 0;
            
        
// Ajax parameter (q=) variable 
// 2. (a)store user input in varaiable.
//    (b)send search term to database

//--------------------THIS IS THE NYT VERSION OF CODE----------------
// var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
//             url += '?' + $.param({
//                 'api-key': "386607bb9b9e4ed39bea6265563b90a3",
//                 'query': queryInput
//             });
//             $.ajax({
//                 url: url,
//                 method: 'GET',
//             })
                                // We store all of the retrieved data inside of an object called "response"
                // .then(function (result) {
                                // Log the resulting object
                    // console.log(result);
                    // for (var i = 0; i < result.results.length; i++) {
                                // Transfer content to HTML
                        // $("#title"+contentIndex+"").html(result.results[i].display_title);
                                // $(".title").text("Title: " + result.results[0].headline);
                        // $("#content"+contentIndex+"").html(result.results[i].summary_short);

                                //return the default library picture if no multimedia exists in JSON object
                        // if (result.results[i].multimedia === null) {
                        //     console.log("no multimedia exists");
                        // $("#cardImg"+contentIndex+"").attr("src","./assets/images/bookstore-slide-2MCD-superJumbo.jpg");

                        // } else {

                        //     $("#cardImg"+contentIndex+"").attr("src", result.results[i].multimedia.src);
                        // }
                                // $(".snippet").text("Article Snippet: " + result.results[0].summary_short);
                                // $(".pubDate").text("Rating: " + result.results[0].mpaa_rating);

            //             contentIndex++;
            //             console.log(contentIndex);
            //         }
            //     });
            //     }
            // });


                    
//--------------------------------------------------------------
 $(document).ready(function() {

// ---------------------------------------------------------------
    var contentIndex = 0;
    var queryInput = "";
    $("#search").keypress(function(e) {
        if (e.which == 13) {
            event.preventDefault();
            queryInput = $("#search").val().trim();
            console.log(queryInput);
            $("#search").val('');
            contentIndex = 0;


            var filtered = [];
        
            var genreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=6bb0a75f85c928245a8216e455d2280b&language=en-US';
        
            var genreData = function(){
                var results = null;
                $.ajax({
                    async: false,
                    type: "GET",
                    global: false,
                    dataType: 'json',
                    url: genreURL,
                    success: function(data){
                        results = data;
                    }
                });
                return results;
            }();
        
                var url = 'https://api.themoviedb.org/3/search/multi'
                var q = '&query=' + queryInput;
                var aKey = '?api_key=6bb0a75f85c928245a8216e455d2280b';
                var lang = '&language=en-US';
                var onPage = 1;
                var pageNum = '&page=' + onPage;
                var adult = '&include_adult=false';
                
                var queryURL = url + aKey + lang + q + pageNum + adult;
                
                $.ajax({
                    url: queryURL,
                    method: 'GET',
                    success: function(data){
                        console.log(data);
                    }  
                }).then(function(res){
                   
                    for (i=0; i<res.results.length; i++){
                        var dataAccess = res.results[i];
                        console.log(dataAccess.popularity)
                        if (dataAccess.popularity < 3.0) {
                        console.log(res.results[i].popularity)
                        if (res.results[i].popularity < 3.5 || res.results[i].overview == "") {
                            res.results.splice(i,1);
                            continue;
                        }
                        if (res.results[i].name == undefined) {
                            console.log("This has no name; see title:"+res.results[i].name)
                            $("#title"+contentIndex+"").text(res.results[i].title);
                        } else {
                            $("#title"+contentIndex+"").text(res.results[i].name);
                        }

                        $("#title"+contentIndex+"").text(dataAccess.name);
                      
                        $("#content"+contentIndex+"").text(dataAccess.overview);
                        $("#content"+contentIndex+"").text(res.results[i].overview);
                        
                        $("#cardImg"+contentIndex+"").attr("src","http://image.tmdb.org/t/p/w200/"+dataAccess.poster_path);
                        

                        contentIndex++;

                        // if(dataAccess.media_type === 'movie'){
        
                        //     filtered.push(dataAccess)
        
                        //     if(date){
                        //         if (dataAccess.release_date.slice(0, 4) >= date){
                        //         filtered.push(dataAccess);
                        //         };
                        //     }else{
                        //         for(k=0; k<filtered.length; k++){
        
                        //             console.log(filtered[k]);
                                            // if(filtered[k] != dataAccess){
                                            //     filtered.push(dataAccess);
                                            // };
                            //     };
                            // };
        
                        // if(language){
                        //     if(dataAccess.original_language === language){
                        //         filtered.push(dataAccess);
                        //     };
                        // }else{
                        //     for(k=0;k<filtered.length;k++){
                        //         if(filtered[k] != dataAccess){
                        //             filtered.push(dataAccess);
                        //         };
                        //     };
                        // };
           
                        };
                    });   
                };
            
            console.log(filtered);
        });
        //----------------------------------------------------------   
        //ajax call for NYT default search items (most popular posts regarding movies) on page load

            // var url = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Movies/1.json";
            //     url += '?' + $.param({
            //     'api-key': "386607bb9b9e4ed39bea6265563b90a3"
            //     });
            //     $.ajax({
            //     url: url,
            //     method: 'GET',
            //     })

            //     .then(function (result) {
            //         // Log the resulting object
            //         console.log(result);
            //         for (var i = 0; i < result.results.length; i++) {
            //             // Transfer content to HTML
            //             $("#title"+contentIndex+"").text(result.results[i].title);
                      
            //             $("#content"+contentIndex+"").text(result.results[i].abstract);
                        
            //             $("#cardImg"+contentIndex+"").attr("src", result.results[i].media["0"]["media-metadata"][1].url);
                        

            //             contentIndex++;
            //         }
            //     });
            // });

//------------------------------------------------------------
// AJAX call for default TMDB Discover items

    var currentDate = new Date("2018-02-09");   
    currentDate = moment(currentDate).format("YYYY-MM-DD");
    console.log(currentDate);
      
    $.ajax({
        url: 'https://api.themoviedb.org/3/discover/movie?api_key=6bb0a75f85c928245a8216e455d2280b&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=' + currentDate, // Calls for most recent movies out
        method: 'GET',
        success: function (data) {
            console.log(data)
        }
        }).then(function (res){
            for(i=0; i<res.results.length; i++){
                var defaultInfo = res.results[i];

                $("#title"+contentIndex+"").text(defaultInfo.title);
                      
                $("#content"+contentIndex+"").text(defaultInfo.overview);
                        
                $("#cardImg"+contentIndex+"").attr("src","http://image.tmdb.org/t/p/w200/"+defaultInfo.poster_path);
                        

                contentIndex++;
                
            };
        });

    });

// B. TABS for different media
// dropdown search parameter(filter with radio buttons options). onclick show/hide table
        // Event listener (for each filter)
        // Ajax parameter(for each filter) variable 
// 1. date - release date
// 2. runtime
// 3. genres- dropdown with list of games
// 4. language
// 5. Actor - disregard other parameter, all movies with x actor (STRECH)
// *NOTE* on active they will enter into corresponding ajax variable




// C. cards with movies from database
        // This needs event listener to load 
//  This will be default cards (popular/recent movies)
// 1. poster (top)
// 2. button (clicking this button will take us to the next html page for movie)
// 3. Title/Summary



// page 2

// A and B remains the same
// C-->D Movies based on keyword search..// Do button link to html page for movie
// cards with data from search

//  POSTER DATA--- <img>, attr src
    // button eventListener
// 1.poster
// 2. button- htmlfor movie (page 3)
// 3. title, synopsis



// page 3 (MOVIE PAGE)

// A & B remains the same
// C. movie data (TOMD)
    // 1. Title
    // 2. Posters + extra info (year, actor etc)
    // 3. summary



// D. Trailer (Trailer addict)
    // *searches for trailer using title data from TOMD
    // trailer (load)
        //event listener(click)
            // toggle (active/inactive) 

// E. NYT review (NYT Movies)
    // load data(eventListener)

// F. Movie reviews (Youtube)
    // eventListener (click)
    // link to youtube(because of liscense)


// E.NYT Ajax using the title from OMDB as search
// F.YouTube Ajax using the title from OMDB as search

// G.data populated from OMDB info, This includes TITLE, POSTER, SUMMARY

