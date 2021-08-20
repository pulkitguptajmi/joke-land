const fs = require('fs');

const fsPromises = fs.promises;
const path = require('path');

function extractJokes(stringifiedJokesData) {
    const regularExpression = /(\w+?\|)(.|\r\n)+?(\|\r\n)/g;
    const rowsOfText = stringifiedJokesData.match(regularExpression);
    const jokes = [];
    for (let row = 0; row < rowsOfText.length; row++) {
        const currentTextRow = rowsOfText[row].split('|', 2);
        jokes.push({ jokeId: currentTextRow[0], jokeText: currentTextRow[1] });
    }
    return jokes;
}

module.exports = function (fileName) {
    const filePath = path.join(__dirname, fileName);

    return () => {
        const jokes = fsPromises.readFile(filePath)
            .then(jokesData => extractJokes(jokesData.toString()))
            .catch((error) => { throw error; });

        return jokes;
    };
};
