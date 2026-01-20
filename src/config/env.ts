import 'dotenv/config';

export const env = {
    PORT: process.env.PORT || 3000,
    SALT: process.env.SALT_ROUNDS,

    DB: {
        URL: process.env.DATABASE_URL || '',
    },

    JWT: {
        KEY: process.env.JWT_SECRET || '',
    },

    TIMES: {
        TEN_MINUTES: 1000 * 60 * 10,
        THREE_HOURS: 1000 * 60 * 60 * 3,
        THREE_DAYS: 1000 * 60 * 60 * 24 * 3,
    },
};
