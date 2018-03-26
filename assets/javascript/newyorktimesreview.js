$(document).ready(function() {

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

    //retrieve card data-index attribute from DB
    var cardval;
    loadData.ref('cardvalue').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            cardval = childSnapshot.val();
            console.log("cardval: "+cardval);
        })    
        });

    //POPULATE TITLE TO INFO PAGE
    var titlekeyArray;  
    var titleIndex;   
    loadData.ref('KEYtitlekeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            titlekeyArray = childSnapshot.val();
            console.log("titlekeyarray: "+titlekeyArray);
            titleIndex = titlekeyArray[cardval];
            console.log("titleindex= "+titleIndex)
        })    
        });

    var searchtitlekeyArray;  
    var searchtitleIndex;   
    loadData.ref('KEYsearchtitlekeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            searchtitlekeyArray = childSnapshot.val();
            console.log("searchtitlekeyarray: "+searchtitlekeyArray);
            searchtitleIndex = searchtitlekeyArray[cardval];
            console.log("searchtitleindex= "+searchtitleIndex)
        })    
        });

    var titleOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("title");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === titleIndex) {
    titleOfInterest = child.val();
    console.log(titleOfInterest);
    console.log(typeof titleOfInterest)
    $("#sd-bar-title").text(titleOfInterest);

    contentIndex = 0;
    var queryInput = "Dunkirk";

var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
             url += '?' + $.param({
                 'api-key': "386607bb9b9e4ed39bea6265563b90a3",
                 'query': titleOfInterest
             });
             $.ajax({
                 url: url,
                 method: 'GET',
             })
                                 // We store all of the retrieved data inside of an object called "response"
                 .then(function (result) {
                                 // Log the resulting object
                     console.log("i am result", result);
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
                    });
                    var URL = "https://www.googleapis.com/youtube/v3/search?"
    var part = "&part=snippet&q=" //snippet is the default setting, but it gives us the information that we looking for 
    var trailers = "trailers"
    var q = titleOfInterest +" "+ trailers //searching for music, we will change this with the uer input below
    var results = "&maxResults=5" //results can be 0 to 50 
    var order = "&order=relevance" //listed in order of relevance 
    var type = "&type=video"  //this has to be (channel, playlist, or video)
    var videoSyndicated = "&videoSyndicated=true" //if true this only returns videos that can be played outside of youtube 
    var videoEmbeddable = "&videoEmbeddable=true" //only returns embeddable videos
    var videoLicense = "&videoLicense=creativeCommon" //only returns videos with a creative common license
    // var videoCategory = "&videoCategoryId=30" //category 30 is movies 
    var APIkey = "&key=AIzaSyBP43ErpwhWXmxgZehpzg3e0obiYKKNHfY";
    var queryURL = URL + part + q + results + order + type + videoSyndicated + videoEmbeddable + videoLicense + APIkey

    // https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults=30
    // &order=relevance&type=video&videoCaption=any&videoCategoryId=10
    // &key=AIzaSyBP43ErpwhWXmxgZehpzg3e0obiYKKNHfY

    // Creating an AJAX call for the specific button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.items.length; i++){
        console.log(response.items[i].id.videoId);
        console.log(response.items[i].snippet.title);
        console.log(response.items[i].snippet.description);
        console.log(response.items[i].snippet.thumbnails.high);

        // Storing the link to the video on YouTube
        var youTubeLink = "https://www.youtube.com/watch?v=" + response.items[0].id.videoId;

        $("#trailerBtn").attr("href", youTubeLink);

        // // Creating an element to hold the link to the video on YouTube
        // var pTwo = $("<p>").text("YouTube Link: " + youTubeLink);

        // // Displaying the YouTube Link
        // movieDiv.append(pTwo);

        // // Storing the plot or description
        // var plot = response.items[i].snippet.description;

        // // Creating an element to hold the plot or description
        // var pThree = $("<p>").text("Description: " + plot);

        // // Appending the plot or description
        // movieDiv.append(pThree);

        // // Retrieving the URL for the image
        // var imgURL = response.items[i].snippet.thumbnails.high.url;

        // // Creating an element to hold the image
        // var image = $("<img>").attr("src", imgURL);

        // // Appending the image
        // movieDiv.append(image);

        // // Putting the entire movie above the previous movies
        // $("#movies-view").prepend(movieDiv);
        }
    });
    }
  }); 
});


var searchtitleOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("searchTitle");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === searchtitleIndex) {
    searchtitleOfInterest = child.val();
    console.log(searchtitleOfInterest);
    console.log(typeof searchtitleOfInterest)
    $("#sd-bar-title").text(searchtitleOfInterest);

    contentIndex = 0;
    var queryInput = "Dunkirk";

var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
             url += '?' + $.param({
                 'api-key': "386607bb9b9e4ed39bea6265563b90a3",
                 'query': searchtitleOfInterest
             });
             $.ajax({
                 url: url,
                 method: 'GET',
             })
                                 // We store all of the retrieved data inside of an object called "response"
                 .then(function (result) {
                                 // Log the resulting object
                     console.log("i am result", result);
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
                    });
                    var URL = "https://www.googleapis.com/youtube/v3/search?"
    var part = "&part=snippet&q=" //snippet is the default setting, but it gives us the information that we looking for 
    var trailers = "trailers"
    var q = titleOfInterest +" "+ trailers //searching for music, we will change this with the uer input below
    var results = "&maxResults=5" //results can be 0 to 50 
    var order = "&order=relevance" //listed in order of relevance 
    var type = "&type=video"  //this has to be (channel, playlist, or video)
    var videoSyndicated = "&videoSyndicated=true" //if true this only returns videos that can be played outside of youtube 
    var videoEmbeddable = "&videoEmbeddable=true" //only returns embeddable videos
    var videoLicense = "&videoLicense=creativeCommon" //only returns videos with a creative common license
    // var videoCategory = "&videoCategoryId=30" //category 30 is movies 
    var APIkey = "&key=AIzaSyBP43ErpwhWXmxgZehpzg3e0obiYKKNHfY";
    var queryURL = URL + part + q + results + order + type + videoSyndicated + videoEmbeddable + videoLicense + APIkey

    // https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults=30
    // &order=relevance&type=video&videoCaption=any&videoCategoryId=10
    // &key=AIzaSyBP43ErpwhWXmxgZehpzg3e0obiYKKNHfY

    // Creating an AJAX call for the specific button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.items.length; i++){
        console.log(response.items[i].id.videoId);
        console.log(response.items[i].snippet.title);
        console.log(response.items[i].snippet.description);
        console.log(response.items[i].snippet.thumbnails.high);

        // Storing the link to the video on YouTube
        var youTubeLink = "https://www.youtube.com/watch?v=" + response.items[0].id.videoId;

        $("#trailerBtn").attr("href", youTubeLink);

        // // Creating an element to hold the link to the video on YouTube
        // var pTwo = $("<p>").text("YouTube Link: " + youTubeLink);

        // // Displaying the YouTube Link
        // movieDiv.append(pTwo);

        // // Storing the plot or description
        // var plot = response.items[i].snippet.description;

        // // Creating an element to hold the plot or description
        // var pThree = $("<p>").text("Description: " + plot);

        // // Appending the plot or description
        // movieDiv.append(pThree);

        // // Retrieving the URL for the image
        // var imgURL = response.items[i].snippet.thumbnails.high.url;

        // // Creating an element to hold the image
        // var image = $("<img>").attr("src", imgURL);

        // // Appending the image
        // movieDiv.append(image);

        // // Putting the entire movie above the previous movies
        // $("#movies-view").prepend(movieDiv);
        }
    }); 
    }
  }); 
});


    //POPULATE OVERVIEW TO INFO PAGE
    var overviewkeyArray;  
    var overviewIndex;   
    loadData.ref('KEYoverviewkeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            overviewkeyArray = childSnapshot.val();
            console.log("overviewkeyarray: "+overviewkeyArray);
            overviewIndex = overviewkeyArray[cardval];
            console.log("overviewindex= "+overviewIndex)
        })    
        });

    var searchoverviewkeyArray;  
    var searchoverviewIndex;   
    loadData.ref('KEYsearchoverviewkeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            searchoverviewkeyArray = childSnapshot.val();
            console.log("searchoverviewkeyarray: "+searchoverviewkeyArray);
            searchoverviewIndex = searchoverviewkeyArray[cardval];
            console.log("searchoverviewindex= "+searchoverviewIndex)
        })    
        });

    var overviewOfInterest;
    var searchoverviewOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("overview");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === overviewIndex) {
    overviewOfInterest = child.val();
    console.log("overview of interest: "+overviewOfInterest);
    console.log(typeof overviewOfInterest)
    $("#overview-p").text(overviewOfInterest);
    } 
    }); 
}); 
        
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("searchOverview");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === searchoverviewIndex) {
    searchoverviewOfInterest = child.val();
    console.log("HELLO"+searchoverviewOfInterest);
    console.log(typeof searchoverviewOfInterest)
    $("#overview-p").text(searchoverviewOfInterest);    
    }
    }); 
});

    //POPULATE POSTER
    var imagekeyArray;  
    var imageIndex;   
    loadData.ref('KEYimagekeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            imagekeyArray = childSnapshot.val();
            console.log("imagekeyarray: "+imagekeyArray);
            imageIndex = imagekeyArray[cardval];
            console.log("imageindex= "+imageIndex)
        })    
        });

    var searchimagekeyArray;  
    var searchimageIndex;   
    loadData.ref('KEYsearchimagekeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            searchimagekeyArray = childSnapshot.val();
            console.log("searchimagekeyarray: "+searchimagekeyArray);
            searchimageIndex = searchimagekeyArray[cardval];
            console.log("searchimageindex= "+searchimageIndex)
        })    
        });

    var imageOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("image");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === imageIndex) {
    imageOfInterest = child.val();
    console.log(imageOfInterest);
    console.log(typeof imageOfInterest)
    $("#pg-3-poster").attr("src", imageOfInterest);
    }
    }); 
});

var searchimageOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("searchImage");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === searchimageIndex) {
    searchimageOfInterest = child.val();
    console.log(searchimageOfInterest);
    console.log(typeof searchimageOfInterest)
    $("#pg-3-poster").attr("src", searchimageOfInterest);
    }
    }); 
});

//POPULATE DATE
var datekeyArray;  
    var dateIndex;   
    loadData.ref('KEYdatekeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            datekeyArray = childSnapshot.val();
            console.log("datekeyarray: "+datekeyArray);
            dateIndex = datekeyArray[cardval];
            console.log("dateindex= "+dateIndex)
        })    
        });

var searchdatekeyArray;  
var searchdateIndex;   
loadData.ref('KEYsearchdatekeyarray').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        searchdatekeyArray = childSnapshot.val();
        console.log("searchdatekeyarray: "+searchdatekeyArray);
        searchdateIndex = searchdatekeyArray[cardval];
        console.log("searchdateindex= "+searchdateIndex)
    })    
    });

    var dateOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("date");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === dateIndex) {
    dateOfInterest = child.val();
    console.log(dateOfInterest);
    console.log(typeof dateOfInterest)
    $("#date-p").text(dateOfInterest);
    }
    }); 
});

var searchdateOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("searchDate");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === searchdateIndex) {
    searchdateOfInterest = child.val();
    console.log(searchdateOfInterest);
    console.log(typeof searchdateOfInterest)
    $("#date-p").text(searchdateOfInterest);
    }
    }); 
});

//POPULATE VOTE
var votekeyArray;  
    var voteIndex;   
    loadData.ref('KEYvotekeyarray').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            votekeyArray = childSnapshot.val();
            console.log("votekeyarray: "+votekeyArray);
            voteIndex = votekeyArray[cardval];
            console.log("voteindex= "+voteIndex)
        })    
        });

var searchvotekeyArray;  
var searchvoteIndex;   
loadData.ref('KEYsearchvotekeyarray').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        searchvotekeyArray = childSnapshot.val();
        console.log("searchvotekeyarray: "+searchvotekeyArray);
        searchvoteIndex = searchvotekeyArray[cardval];
        console.log("searchvoteindex= "+searchvoteIndex)
    })    
    });

    var voteOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("vote");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === voteIndex) {
    voteOfInterest = child.val();
    console.log(voteOfInterest);
    console.log(typeof voteOfInterest)
    $("#vote-p").text(voteOfInterest);
    }
    }); 
});


var searchvoteOfInterest;
    var rootRef = firebase.database().ref();
    var urlRef = rootRef.child("searchVote");
    urlRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    if (child.key === searchvoteIndex) {
    searchvoteOfInterest = child.val();
    console.log(searchvoteOfInterest);
    console.log(typeof searchvoteOfInterest)
    $("#vote-p").text(searchvoteOfInterest);
    }
    }); 
});



});


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
                
                
      