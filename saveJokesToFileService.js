const path = require('path');
const fs = require('fs');

module.exports = function (fileName) {
    const filePath = path.join(__dirname, fileName);

    return function (jokes) {
        return new Promise((resolve, reject) => {
            fs.appendFile(filePath, jokes, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    };
};
