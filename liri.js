require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

//// variables for user input ////
var command = process.argv[2];
var input = process.argv.slice(3).join("+")
var theSign = process.argv[3];
var mrNobody = process.argv[3];

//////////////////
// CONCERT THIS //
/////////////////
function concertThis() {
     axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then
     (function(response){
          for(var i = 0; i < response.data.length; i++){
          console.log("Event " + i);
          console.log("Venue Name : " + response.data[i].venue.name);
          console.log("Venue Location : " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          console.log("Date of Event : " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("\n=======================================================================\n");
          }
     },
     function(error) {
       if (error.response) {
          console.log(error.response.data);
     } else if (error.request) {
          console.log(error.request);
     } else {
          console.log("Sorry, there are no concerts : ", error.message);
     }
     console.log(error.config);
     }
     )
}

///////////////////////
// SPOTIFY THIS SONG //
///////////////////////
function spotifyThis(){
     // for undefined search
     if(theSign === undefined) {
          input = "The Sign Ace of Base"
     };

     spotify.search({ type: 'track', query: input }, function(err, data) {
          if (err) {
            return console.log("Sorry, no songs are found: " + err);
          }
          // normal search
          console.log("\n=======================================================================\n");
          console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
          console.log("Song Title: " + data.tracks.items[0].name);
          console.log("Click here for a preview: " + data.tracks.items[0].preview_url);
          console.log("Album: " + data.tracks.items[0].album.name);
          console.log("\n=======================================================================\n");
     });
}


////////////////
// MOVIE THIS //
////////////////
function movieThis() {
     if(mrNobody === undefined) {
          input = "Mr. Nobody"
     };

     axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
     .then(function(response) {
          console.log("\n=======================================================================\n");
          console.log("Title: " + response.data.Title);
          console.log("Release Date: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
          console.log("\n=======================================================================\n");
  }
);
}


/////////////////////
// DO WHAT IT SAYS //
/////////////////////
function doWhatItSays() {
     fs.readFile("random.txt", "utf8", function(error, data) {
          if (error) {
               return console.log(error);
          }

          var dataArr = data.split(","); // [ 'concert-this', ' "ZHU"' ] //
          // set to command line
          command = dataArr[0];
          input = dataArr[1].trim();
          console.log(command + input);

          //run function
          liriBot();
     })
}


////////////////////////////
// MAIN COMMAND FUNCTIONS //
////////////////////////////
function liriBot() {
     switch(command){
     case "concert-this" :
     concertThis();
     break;
     case "spotify-this-song" :
     spotifyThis();
     break;
     case "movie-this" :
     movieThis();
     break;
     case "do-what-it-says" :
     doWhatItSays();
     break;
     default :
     console.log("I don't understand");
     }
}

//run program
liriBot();