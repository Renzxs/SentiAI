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
        geminiApiKey: process.env.GEMINI_API_KEY,
        geminiModel: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
        gptApiKey: process.env.GPT_API_KEY,
        gptModel: process.env.GPT_MODEL || 'omni-moderation-latest',
        deepseekApiKey: process.env.DEEPSEEK_API_KEY,
        deepseekModel: process.env.DEEPSEEK_MODEL || 'accounts/fireworks/models/deepseek-r1-0528',
        hfApiKey: process.env.HF_API_KEY,
        ghOpenAiApiKey: process.env.GH_OPENAI_API_KEY,
        ghOpenAiModel: process.env.GH_OPENAI_MODEL || 'openai/gpt-4.1'
    }
})