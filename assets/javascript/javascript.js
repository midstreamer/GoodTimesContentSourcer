$(document).ready(function () {

    var titlekeyArray = [];
    var overviewKeyArray = [];
    var imageKeyArray = [];
    var dateKeyArray = [];
    var voteKeyArray = [];

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDroCpq4OgkTGdZARAsbG_Tt7xdHdu6Xyw",
        authDomain: "good-times-content-sourcer.firebaseapp.com",
        databaseURL: "https://good-times-content-sourcer.firebaseio.com",
        projectId: "good-times-content-sourcer",
        storageBucket: "good-times-content-sourcer.appspot.com",
        messagingSenderId: "806270030885"
    };
    firebase.initializeApp(config);

    var loadData = firebase.database();

    //shows and hides the filter.
    $('#filterOptions').hide();

    $('#filterBtn').on('click', function () {

        $('#filterBtn').hide();
        $('#welcomeText').hide();
        $('#filterOptions').show();

    });

    $('.center').on('click', function () {

        $('#filterOptions').hide();
        $('#filterBtn').show();
        $('#welcomeText').show();
    });

    //makes date and genre scrolls work. 
    $('select').formSelect();

    loadData.ref('title').remove();
    loadData.ref('overview').remove();
    loadData.ref('image').remove();
    loadData.ref('date').remove();
    loadData.ref('vote').remove();
    loadData.ref('KEYtitlekeyarray').remove();
    loadData.ref('KEYoverviewkeyarray').remove();
    loadData.ref('KEYimagekeyarray').remove();
    loadData.ref('KEYdatekeyarray').remove();
    loadData.ref('KEYvotekeyarray').remove();
    loadData.ref('KEYsearchtitlekeyarray').remove();
    loadData.ref('KEYsearchoverviewkeyarray').remove();
    loadData.ref('KEYsearchimagekeyarray').remove();
    loadData.ref('KEYsearchdatekeyarray').remove();
    loadData.ref('KEYsearchvotekeyarray').remove();

    // AJAX call for default TMDB search items

    var currentDate = new Date("2018-02-09");
    currentDate = moment(currentDate).format("YYYY-MM-DD");
    console.log(currentDate);
    var filteredRes = [];

    $.ajax({
        url: 'https://api.themoviedb.org/3/discover/movie?api_key=6bb0a75f85c928245a8216e455d2280b&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=' + currentDate, // Calls for movies from recent year
        method: 'GET',
        //   success: function (data) {
        //       console.log(data)
        //}
    }).then(function (res) {
        for (i = 0; i < 12; i++) {

            console.log("i = " + i)
            var defaultInfo = res.results[i];
            // $(defaultInfo).push(filteredRes);
            // console.log(filteredRes);
            // var topTwelve = defaultInfo.slice(0, 11);

            $("#title" + contentIndex + "").text(defaultInfo.title);

            $("#content" + contentIndex + "").text(defaultInfo.overview);

            $("#cardImg" + contentIndex + "").attr("src", "http://image.tmdb.org/t/p/w200/" + defaultInfo.poster_path);


            loadData.ref('title').push(defaultInfo.title);
            loadData.ref('overview').push(defaultInfo.overview);
            loadData.ref('image').push("http://image.tmdb.org/t/p/w500" + defaultInfo.poster_path);
            loadData.ref('date').push(res.results[i].release_date);
            loadData.ref('vote').push(res.results[i].vote_average);

            contentIndex++;

        };
        console.log(res)

        loadData.ref('title').once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var titlekey = childSnapshot.key;
                var childData = childSnapshot.val();
                titlekeyArray.push(titlekey);
                console.log("titlekeyarray =", titlekeyArray);

            });
            loadData.ref('KEYtitlekeyarray').push(titlekeyArray);
        });

        loadData.ref('overview').once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var overviewkey = childSnapshot.key;
                var childData = childSnapshot.val();
                overviewKeyArray.push(overviewkey);
                console.log("overviewkeyarray =", overviewKeyArray);

            });
            loadData.ref('KEYoverviewkeyarray').push(overviewKeyArray);
        });

        loadData.ref('image').once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var imagekey = childSnapshot.key;
                var childData = childSnapshot.val();
                imageKeyArray.push(imagekey);
                console.log("imagekeyarray =", imageKeyArray);

            });
            loadData.ref('KEYimagekeyarray').push(imageKeyArray);
        });

        loadData.ref('date').once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var datekey = childSnapshot.key;
                var childData = childSnapshot.val();
                dateKeyArray.push(datekey);
                console.log("datekeyarray =", dateKeyArray);

            });
            loadData.ref('KEYdatekeyarray').push(dateKeyArray);
        });

        loadData.ref('vote').once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var votekey = childSnapshot.key;
                var childData = childSnapshot.val();
                voteKeyArray.push(votekey);
                console.log("votekeyarray =", voteKeyArray);

            });
            loadData.ref('KEYvotekeyarray').push(voteKeyArray);
        });


    })

    //AJAX call for genreData
    var genreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=6bb0a75f85c928245a8216e455d2280b&language=en-US';

    var genreData = function () {
        var results = null;
        $.ajax({
            async: false,
            type: "GET",
            global: false,
            dataType: 'json',
            url: genreURL,
            success: function (data) {
                results = data;
            }
        });
        return results;
    }();

    console.log(genreData);

    // Genre Filter
    // var selectedGenreID = "";
    // $('option[name=genre]').on("click", function(event) {
    //     selectedGenreID = parseInt($(this).val());
    //     console.log(selectedGenreID);
    // });

    //-----------------------------------search version
    var contentIndex = 0;
    var queryInput = "";
    var searchResults;
    var searchtitlekeyArray = [];
    var searchoverviewKeyArray = [];
    var searchimageKeyArray = [];
    var searchdateKeyArray = [];
    var searchvoteKeyArray = [];


    $("#search").keypress(function (e) {
        if (e.which == 13) { // When enter is pressed fire function
            event.preventDefault();
            queryInput = $("#search").val().trim();
            console.log("queryinput: " + queryInput);
            $("#search").val('');
            contentIndex = 0;
            $(".card").show();

            loadData.ref('title').remove();
            loadData.ref('overview').remove();
            loadData.ref('image').remove();
            loadData.ref('date').remove();
            loadData.ref('KEYtitlekeyarray').remove();
            loadData.ref('KEYoverviewkeyarray').remove();
            loadData.ref('KEYimagekeyarray').remove();
            loadData.ref('KEYdatekeyarray').remove();
            loadData.ref('KEYvotekeyarray').remove();
            loadData.ref('searchTitle').remove();
            loadData.ref('searchOverview').remove();
            loadData.ref('searchImage').remove();
            loadData.ref('searchDate').remove();
            loadData.ref('searchVote').remove();
            loadData.ref('KEYsearchtitlekeyarray').remove();
            loadData.ref('KEYsearchoverviewkeyarray').remove();
            loadData.ref('KEYsearchimagekeyarray').remove();
            loadData.ref('KEYsearchdatekeyarray').remove();
            loadData.ref('KEYsearchvotekeyarray').remove();

            var dFromVal = $('#dateFromSelect').val();
            var dToVal = $('#dateToSelect').val();
            console.log(dFromVal)
            console.log(dToVal)

            var selectedGenreVal = parseInt($('#genreFromSelect').val());
            console.log(selectedGenreVal)

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
                success: function (data) {
                    console.log(data);

                }
            }).then(function (res) {

                for (i = 0; i < 12; i++) {

                    var dataAccess = res.results[i];
                    //check that result exists; if not, iterate to next
                    if (res.results[i] == undefined) {
                        console.log("I am undefined")
                        continue;
                    }
                    console.log("1.0 I am i: " + i)
                    console.log("1. i am res.results.length:" + res.results.length)
                    console.log("I am res.results[i]: ", res.results[i])

                    var dataAccess = res.results[i];

                    console.log(res.results[i].popularity)

                    //filter out all results that do not fit popularity requirement or has a blank overview section; iterate to next
                    if (res.results[i].popularity < 3.0 || res.results[i].overview == "") {
                        console.log("3. I am getting cut(1): " + res.results[i].title)

                        res.results.splice(i, 1);
                        i -= 1;
                        continue;
                    }

                    //filter out results for all movie media types
                    if (dataAccess.media_type != 'movie') {
                        console.log("3. i am getting cut(2): " + res.results[i].title)
                        res.results.splice(i, 1);
                        i -= 1;
                        continue;
                    }
                    console.log("4. filtered results=", res)



                    // Run above filters before Date/Genre

                    //------------ Date Filter -------
                    var mYear = dataAccess.release_date.slice(0, 4);
                    console.log("myear= " + mYear)

                    if (dFromVal != null) {
                        if (mYear < dFromVal || mYear > dToVal) {
                            console.log("3. i am getting cut(3): " + res.results[i].title)
                            res.results.splice(i, 1);
                            i -= 1;
                            continue;
                        };
                    };

                    // Genre Filter

                    console.log("selectedGenreVal =" + selectedGenreVal)
                    console.log("dataaccess genreid= ", dataAccess.genre_ids);
                    console.log(typeof selectedGenreVal)

                    if (Number.isNaN(selectedGenreVal)) {
                        console.log("genre is not picked");
                        false;
                    } else if ($.inArray(selectedGenreVal, res.results[i].genre_ids) == -1) {
                        console.log("selected genre is not in result")
                        res.results.splice(i, 1);
                        i -= 1;
                        continue;
                    }
                    console.log("4. filtered results=", res)
                    // Event listener for each button that responds to ID
                    // Iterate through genre IDs - dataAccess.media_types[i]
                    // If for each ID that compares to genre_ids of json object
                    // If genre_ids != splice out results


                    //fill cards with title, overview, and image from JSON object
                    $("#title" + contentIndex + "").text(res.results[i].title);

                    $("#content" + contentIndex + "").text(res.results[i].overview);

                    $("#cardImg" + contentIndex + "").attr("src", "http://image.tmdb.org/t/p/w200" + res.results[i].poster_path);


                    loadData.ref('searchTitle').push(res.results[i].title);
                    loadData.ref('searchOverview').push(res.results[i].overview);
                    loadData.ref('searchImage').push("http://image.tmdb.org/t/p/w500" + res.results[i].poster_path);
                    loadData.ref('searchDate').push(res.results[i].release_date);
                    loadData.ref('searchVote').push(res.results[i].vote_average);
                    //increase the content index for next iteration
                    contentIndex++;
                    console.log("5. contentindex: " + contentIndex)
                }

                loadData.ref('searchTitle').once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var searchtitlekey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        searchtitlekeyArray.push(searchtitlekey);
                        console.log("searchtitlekeyarray =", searchtitlekeyArray);

                    });
                    loadData.ref('KEYsearchtitlekeyarray').push(searchtitlekeyArray);
                });

                loadData.ref('searchOverview').once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var searchoverviewkey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        searchoverviewKeyArray.push(searchoverviewkey);
                        console.log("KEYsearchoverviewkeyarray =", searchoverviewKeyArray);

                    });
                    loadData.ref('KEYsearchoverviewkeyarray').push(searchoverviewKeyArray);
                });

                loadData.ref('searchImage').once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var searchimagekey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        searchimageKeyArray.push(searchimagekey);
                        console.log("KEYsearchimagekeyarray =", searchimageKeyArray);

                    });
                    loadData.ref('KEYsearchimagekeyarray').push(searchimageKeyArray);
                });

                loadData.ref('searchDate').once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var searchdatekey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        searchdateKeyArray.push(searchdatekey);
                        console.log("KEYsearchdatekeyarray =", searchdateKeyArray);

                    });
                    loadData.ref('KEYsearchdatekeyarray').push(searchdateKeyArray);
                });

                loadData.ref('searchVote').once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var searchvotekey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        searchvoteKeyArray.push(searchvotekey);
                        console.log("KEYsearchvotekeyarray =", searchvoteKeyArray);

                    });
                    loadData.ref('KEYsearchvotekeyarray').push(searchvoteKeyArray);
                });


                //Hide extra cards; remove remaining cards if the search filter does not provide enough search results, less than number of cards (undefined/null) 

                for (var j = 11; j >= res.results.length; --j) {
                    console.log("i am inside this for")
                    if (res.results.length < 12) {
                        console.log("Res.results.length: ", res.results.length)
                        console.log("I will hide card: " + j)
                        $("#card" + j).hide();
                    }
                }
            });
        };
    });

    // Event Listener for Card buttons link to page 3
    $('.cardbtn').on('click', function () {
        loadData.ref('cardvalue').remove();
        var cardVal = $(this).data("index");
        loadData.ref('cardvalue').push(cardVal);
        console.log('VALUE=' + cardVal);








        location.href = './more-info.html';

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