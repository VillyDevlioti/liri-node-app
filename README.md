# liri-node-app

# Preface

# ====== The Problem =======

We were asked to purvey a node.js app which would look up artists, songs and movies and retrieve all relevant info. 

For the artists information part, we were asked to use the Bandsintown API to retrieve the upcoming concerts.

For the song information part, we were asked to use the Spotify API to look up song information. 

For the movie information part, we were asked to use the OMDB API to look up movie information

The app satisfies all of these requirements, in addition to a "do what you want" option, which reads information from a file, and identifies whether it's an artist, song or movie and triggers the relevant action (As described above)

# ------- THE STRUCTURE -------

I tried to make the code readable. The user is asked to provide input regarding the functionality they wish to use. 

According to the choice, the relevant chain of functions is triggered. For each functionality (movie, song or band), the code is structured in three distinct units: 

1. Getting the name of the artist/movie/song and forming the query
2. Hitting the relevant API with the query
3. Printing the info

The reasons I used this approach are:

1. Making the code readable
2. Making individual code components readable

# ------- HOW TO USE -------

1. Download the repository
2. make sure you install all the relevant node packages in terminal
    - npm install axios
    - npm install node-spotify-api
    - npm install moment
    - npm install inquirer
    - npm install dotenv
3. type node LiriNodeApp.js to start the application
4. provide the input as per the screen guidance
5. View the results

# ------- SCREENSHOTS / MEDIA -------
included in the repo

# ------- TECHNOLOGIES USED -------
NODE.JS


# ------- ROLE -------

I developed the app. Special thanks to Angelo and Juan for debugging with me.

