import { env } from './env.js';
import express, { type Express } from 'express';
import colors from 'colors';

export class Server {
    static init(): Express {
        const app = express();
        const port = env.PORT;

        app.listen(port, () => console.log(colors.cyan.bold(`server run on port ${port}`)));

        return app;
    }
}
