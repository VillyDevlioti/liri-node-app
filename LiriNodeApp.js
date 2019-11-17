require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var axios = require("axios");
var inquirer = require("inquirer"); //load the package
let spotify = new Spotify(keys.spotify);

inquirer
  .prompt([
    //Here we create a basic text prompt.
        {
            type: "list",
            message: "Please select the function",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "userInput"
        }
    ])
    .then(function(inquirerResponse){
        switch (inquirerResponse.userInput) {       
            case "concert-this":
                getBandInfo(); //switching to band function
                break;
            case "spotify-this-song":
                getSongInfo();
                break;
            case "movie-this":
                getMovieInfo(); //switching to movie function
                break;
            case "do-what-it-says":
                break;
        }

    });
//---------------------------------------------------------------------------------------------------------------------
function getBandInfo() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "what's the name of the artist/band?",
            name: "artist"
        }
    ])
    .then(function(inquirerResponse){
        
        queryURL="https://rest.bandsintown.com/artists/" + replaceSpace(inquirerResponse.artist) + "/events?app_id=codingbootcamp";
        console.log("Query URL is:", queryURL);
        axios
            .get(queryURL)
            .then(function(response) {
                // If the axios was successful...
                // Then log the body from the site!
                printEventInfo(response.data);
            })
            .catch(function(error) { //function catching
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    });
}
//---------------------------------------------------------------------------------------------------------------------

function getMovieInfo() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "what's the name of the movie?",
            name: "movie"
        }
    ])
    .then(function(inquirerResponse){
        console.log(replaceSpace(inquirerResponse.movie));
        queryURL = "http://www.omdbapi.com/?t="+ replaceSpace(inquirerResponse.movie) +"&y=&plot=short&apikey=trilogy"
        console.log("Query URL is:", queryURL);
        
        axios
            .get(queryURL)
            .then(function(response){
                printMovieInfo(response.data);
                
            })
            .catch(function(error) { //function catching
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    });
}
//---------------------------------------------------------------------------------------------------------------------
function getSongInfo(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "what's the name of the song?",
            name: "song"
        }
    ])
    .then(function(inquirerResponse){
        console.log("You're searching for song:", inquirerResponse.song);

        spotify
        .search({ type: 'track', query: inquirerResponse.song })
        .then(function(data){
            if (data.tracks.items[0]){
                printSongInfo(data.tracks.items[0]);
            }
            else
            {
                console.log("No song found! Defaulting to:")
                spotify
                    .search({ type: 'track', query: 'The Sign Ace Of Base' })
                    .then(function(data){
                        printSongInfo(data.tracks.items[0]);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        })
        .catch(function(err) {
            console.log(err);
        });
        
    });

}
//---------------------------------------------------------------------------------------------------------------------
//this function replaces " " with "%20" in order to form a proper query
function replaceSpace(input) 
{
    if (input.indexOf(" ")) 
    {
        input.replace(" ", "%20");     
    }
    return input;
}
//---------------------------------------------------------------------------------------------------------------------
function printEventInfo(data) //This function prints the first 3 events
{
    if (data[0]) //checking if there's data
    {   
        console.log("-------------------------------------");
        console.log("The 3 upcoming events for artist", data[0].artist.name, "are");
        console.log("-------------------------------------");
        
        for (var i=0; i<3; i++) 
        {
            console.log("The next event is in venue:", data[i].venue.name)
            console.log("The location of the event is:", data[i].venue.city, "-", data[i].venue.country);
            console.log("----------");
        }
    }
    else //if there's no data available
    {
        console.log("Sorry, no info available!")
        //calling the info again.
    }
}
//---------------------------------------------------------------------------------------------------------------------
function printMovieInfo(data) //This function prints the movie info
{
    console.log(data[0]);
    if (data) //checking if there's data
    {   
        console.log("-------------------------------------");
        console.log("Here's the info about the movie you asked for");
        console.log("-------------------------------------");
        console.log("Title:", data.Title);
        console.log("Year released:", data.Year);
        console.log("IMDB Rating of the movie:", data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating of the movie:", data.Ratings[1].Value);
        console.log("Country where the movie was produced:", data.Country);
        console.log("Language of the movie:", data.Language);
        console.log("Plot of the movie:", data.Plot);
        console.log("Actors in the movie:", data.Actors);
        console.log("----------");
        
    }
    else //if there's no data available
    {
        console.log("Sorry, no info available!")
        //calling the info again.
    }
}

function printSongInfo(data) {
    console.log("-------------------------------------");
    console.log("Artist:", data.artists[0].name);
    console.log("Song title:", data.name);
    console.log("Preview link:", data.preview_url);
    console.log("Album:", data.album.name);
    console.log("-------------------------------------");
}
