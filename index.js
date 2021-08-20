const process = require('process');
const jokeService = require('./jokeService');
const acceptCustomerPromptService = require('./acceptCustomerPromptService');

const userPromptType = {
    CustomSearchTerm: 0,
    Leaderboard: 1
};

(async () => {
    if (process.argv[2] === '--searchTerm') {
        const customSearchTerm = process.argv[3] ? process.argv[3] : '';
        jokeService.searchJoke(customSearchTerm);
    } else if (process.argv[2] === '--leaderboard') {
        jokeService.displayMostPopularJoke();
    } else {
        const userPrompt = await acceptCustomerPromptService();
        if (userPrompt.userPromptType === userPromptType.CustomSearchTerm) {
            jokeService.searchJoke(userPrompt.customSearchTerm);
        }else if(userPrompt.userPromptType === userPromptType.Leaderboard) {
            jokeService.displayMostPopularJoke();
        }
    }
})();
