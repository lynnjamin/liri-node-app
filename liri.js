require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var input = process.argv.slice(3).join("+")
var command = process.argv[2];

//////////////////
// CONCERT-THIS //
/////////////////
function concertThis() {
     axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then
     (function(response){
          for(var i = 0; i < 11; i++){
          console.log("Event " + i);
          console.log("Venue Name : " + response.data[i].venue.name);
          console.log("Venue Location : " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          console.log("Date of Event : " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("\n==========================================\n");
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
     spotify.search({ type: 'track', query: input }, function(err, data) {
          if (err) {
            return console.log("No songs are found: " + err);
          }
          console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
          console.log("Song Title: " + data.tracks.items[0].name);
          console.log("Preview Link " + data.tracks.items[0].preview_url);
          console.log("Album: " + data.tracks.items[0].album.name);

        });
}
      



////////////////////////////////
// Main function for commands //
////////////////////////////////
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
