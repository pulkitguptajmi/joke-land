const https = require('https');

module.exports = (jokeApiObj) => {
    const options = {
        hostname: jokeApiObj.host,
        port: 443,
        method: 'GET',
        headers: { Accept: 'application/json' },
        path: jokeApiObj.pathname + jokeApiObj.search
    };

    return new Promise((resolve, reject) => {
        const request = https.request(options,
            (response) => {
                const body = [];
                response.on('data', (textBlob) => { body.push(textBlob); });
                response.on('error', reject);
                response.on('end', () => {
                    if (response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body.toString('utf8'));
                    } else {
                        reject(new Error(`API Request failed. Status Received: ${response.statusCode}, Response Body: ${body}`));
                    }
                });
            });
        request.on('error', reject);
        request.end();
    });
};
