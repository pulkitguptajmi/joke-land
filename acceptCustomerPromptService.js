const prompts = require('prompts');

module.exports = async () => {
    const promptsHelper = [
        {
            type: 'select',
            name: 'UserPromptType',
            message: 'Welcome to JokeLand!. Do you wish to search for jokes, or view the most popular joke in your list (the leaderboard)?',
            choices: [
                { title: 'Search For Jokes', UserPromptType: 0 },
                { title: 'View The Most Popular Joke', UserPromptType: 1 }
            ]
        },
        {
            type: selectedPromptType => selectedPromptType === 0 ? 'text' : null,
            name: 'CustomSearchTerm',
            message: 'Awesome! Please enter a search term for which you wish to view jokes for'
        }
    ];
    const userPromptObj = await prompts(promptsHelper);

    return { userPromptType: userPromptObj.UserPromptType, customSearchTerm: userPromptObj.CustomSearchTerm };
};
