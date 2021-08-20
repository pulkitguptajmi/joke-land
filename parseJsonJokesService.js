let allJokesArray = []

function convertParsedJsonJokeToString(parsedJsonJoke) {
    allJokesArray.push(parsedJsonJoke.joke);
    return `${parsedJsonJoke.id}|${parsedJsonJoke.joke}|\r\n`;
}


module.exports = (jsonJokes) => {
    let linesOfJokeExtractedFromJsonResponse = ''
    let numberOfPages = 0
    let parsedJsonJokes;
    try {

        try {
          parsedJsonJokes = JSON.parse(jsonJokes);
        } catch (error) {
          console.log("The JSON response received from the server isn't properly formatted. Pl try again.")
        }

        if ('results' in parsedJsonJokes) {
            parsedJsonJokes.results.forEach((parsedJsonJoke) => {
                linesOfJokeExtractedFromJsonResponse += convertParsedJsonJokeToString(parsedJsonJoke);
            });
            numberOfPages += (parsedJsonJokes.total_jokes / parsedJsonJokes.limit).toFixed();
        } else {
            linesOfJokeExtractedFromJsonResponse += convertParsedJsonJokeToString(parsedJsonJokes);
        }
    }catch (error) {
        console.log({ error: error, jsonJokes: jsonJokes });
        console.log("There seems to be an error with the JSON response received from server. Pl try running the application again");
        console.log('Tip: You may try using node index.js --searchTern "your desired search term" to re-run the application');
    }

    return { linesOfJokeExtractedFromJsonResponse, numberOfPages, allJokesArray};
};
