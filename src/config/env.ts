import 'dotenv/config';

export const env = {
    PORT: process.env.PORT || 3000,
    SALT: process.env.SALT_ROUNDS,
    isDev: process.env.NODE_ENV === 'development',
    baseUrl: process.env.BASE_URL || '',

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

    SMTP: {
        HOST: process.env.SMTP_HOST || '',
        USER: process.env.SMTP_USER || '',
        PASSWORD: process.env.SMTP_PASSWORD || '',
        PORT: process.env.NODE_ENV === 'development' ? 587 : 465,
        SECURE: process.env.NODE_ENV === 'development' ? false : true,
    },
};
