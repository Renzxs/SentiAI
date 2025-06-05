import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default () => ({
    auth: {
        jwtSecret: process.env.JWT_SECRET,
    },
    mongodb: {
        mongodbUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017',
        mongodbName: process.env.DATABASE_NAME || 'senti-db',
    },
})