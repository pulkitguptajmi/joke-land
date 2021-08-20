const fetchJsonJokesService = require('./fetchJsonJokesService');
const saveJokesToFileService = require('./saveJokesToFileService')(process.env.JOKE_FILE_NAME || 'jokes.txt');
const loadJokesFromFileService = require('./loadJokesFromFileService')(process.env.JOKE_FILE_NAME || 'jokes.txt');
const parseJsonJokesService = require('./parseJsonJokesService');

const jokeApi = new URL('https://icanhazdadjoke.com/');

async function fetchJsonJokes(jokeSearchTerm) {
    const jokeApiObj = new URL(jokeApi.href);
    jokeApiObj.pathname = '/search';
    jokeApiObj.searchParams.set('term', jokeSearchTerm);

    let jokes = '';
    let allJokesArray = [];

    const fetchJsonJokesServiceResponse = await fetchJsonJokesService(jokeApiObj)
    const parseJsonJokesServiceResponse = parseJsonJokesService(fetchJsonJokesServiceResponse);

    jokes += parseJsonJokesServiceResponse.linesOfJokeExtractedFromJsonResponse; 
    allJokesArray = parseJsonJokesServiceResponse.allJokesArray; 
    let randomlySelectedJoke = allJokesArray[Math.floor(Math.random()*allJokesArray.length)];

    if (parseJsonJokesServiceResponse.numberOfPages > 1) {
        const jokeResponses = [];
        for (let pageNumber = 1; pageNumber < parseJsonJokesServiceResponse.numberOfPages; pageNumber++) {
            jokeApiObj.searchParams.set('pageNumber', pageNumber);
            jokeResponses.push(fetchJsonJokesService(jokeApiObj));
        }
        await Promise.all(jokeResponses)
            .then(results => results.forEach((jsonJokeResponeForCurrentPage) => {
                const parsedJokesForCurrentPage =  parseJsonJokesService(jsonJokeResponeForCurrentPage);
                jokes += parsedJokesForCurrentPage.linesOfJokeExtractedFromJsonResponse; 
            }))
            .catch((error) => {
                console.log(error);
            });
    }
    if(jokes == ''){
      return "Uh-oh. No jokes found for your search term"
    }
    else{
      await saveJokesToFileService(jokes);
      return randomlySelectedJoke;
    }
}

async function getMostPopularJoke(jokes) {
    const jokesFrequencyTable = jokes.reduce((statisticsAccumulator, jokeObj) => {
        const jokeFrequency = (statisticsAccumulator[jokeObj.jokeId] ? statisticsAccumulator[jokeObj.jokeId].jokeFrequency : 0) + 1;
        statisticsAccumulator[jokeObj.jokeId] = {jokeFrequency, jokeText: jokeObj.jokeText };

        return statisticsAccumulator;
    }, {});

    let maxJokeFrequencyVal;
    let leaderJokeId;

    for (const [jokeId, jokeObj] of Object.entries(jokesFrequencyTable)) {
        if (!maxJokeFrequencyVal || jokeObj.jokeFrequency > maxJokeFrequencyVal) {
            maxJokeFrequencyVal = jokeObj.jokeFrequency;
            leaderJokeId = jokeId; 
        }
    }

    let leaderJokeText = jokesFrequencyTable[leaderJokeId].jokeText;
    let leaderJokeFrequency = maxJokeFrequencyVal;

    return { leaderJokeText, leaderJokeFrequency };
}

module.exports = {
    searchJoke: async function (jokeSearchTerm) {
        const randomlySelectedJoke = await fetchJsonJokes(jokeSearchTerm);
        console.log(randomlySelectedJoke); 
        return randomlySelectedJoke; 
    },
    displayMostPopularJoke: (async () => {
        const jokes = await loadJokesFromFileService();
        const leaderJokeObj = await getMostPopularJoke(jokes);
        console.log(leaderJokeObj.leaderJokeText);
        console.log("Leader Joke's Frequency: " + leaderJokeObj.leaderJokeFrequency)
        return leaderJokeObj.leaderJokeText;
    })
};
