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
};
