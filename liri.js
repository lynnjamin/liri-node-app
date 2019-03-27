require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var input = process.argv.slice(3).join(" ")


function concertThis() {
     axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then
     (function(response){
          for(var i = 0; i < response.data.length; i++){
          console.log("Venue Name : " + response.data[i].venue.name);
          console.log("Venue Location : " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          console.log("Date of Event : " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("==========================================");
          }
     },
     function(error) {
       if (error.response) {
          console.log(error.response.data);
     } else if (error.request) {
          console.log(error.request);
     } else {
          console.log("Error", error.message);
     }
     console.log(error.config);
   }
 )
}

concertThis();



switch(input) {
     case "concert-this" :
     break;
     case "spotify-this-song" :
     break;
     case "movie-this" :
     break;
     case "do-what-it-says" :
     break;

     default: 
}

