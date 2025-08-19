import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default () => ({
    auth: {
        jwtSecret: process.env.JWT_SECRET,
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:9090/sentiai/github/callback',
        scope: 'user:email',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    mongodb: {
        mongodbUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017',
        mongodbName: process.env.DATABASE_NAME || 'senti-db',
    },
    ai: {
        ghOpenAiApiKey: process.env.GH_OPENAI_API_KEY,
        ghOpenAiModel: process.env.GH_OPENAI_MODEL || 'openai/gpt-5-nano'
    }
})