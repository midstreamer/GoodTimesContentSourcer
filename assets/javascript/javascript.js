// pseudocode
// page 1

// A.user input for keyword search(TOMD AJAX) 
// search bar (default= Title order by popularity on search)
// 1. event listener for user input (input validation)
    //Event listener
    // Ajax parameter (q=) variable 
// 2. (a)store user input in varaiable.
//    (b)send search term to database




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