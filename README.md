# joke-land
A NodeJS command line to fetch jokes, based on a search term

Build a simple command line tool which allows us to make a request to an API and
store the data in a text file by using the following modules:

fs - for reading and writing to a file
process - for gathering arguments from the command line
request - for making API requests (this is an external module)

This application should accept a command line argument using process.argv. The command line argument should be a search term and your application should make an API request to
the (https://icanhazdadjoke.com/api) to search for a joke based on the search term. If it finds jokes matching the term, it should output a random joke, and should also save the joke to a file
called jokes.txt. If it doesn’t find a joke, it should log a message to the console telling the user that no jokes were found for that search term.

1. Use the Prompt module to ask a user for some input instead of having to pass in an argument from the command line.
2. Your program should accept a command line argument called leaderboard. If that command line argument is passed in, your application should return the most popular joke based on how many times it appears in jokes.txt

Submission Instructions

You can push the final code to a public github repo and share the link with us.
The github repo should contain the entire code needed for running the application.
Please include any additional information in the Readme file.

## To run the application:
- npm install
- npm start <br> <br>
Alternatively (to npm start)
- node index.js --searchTerm "Enter Your Desired Joke Search Term"
- node index.js --leaderboard (to view the current most popular joke)

## A running version of the code can be viewed online at: https://replit.com/@pulkitjmi/joke-land
