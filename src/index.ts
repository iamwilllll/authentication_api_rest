import { Server, Database } from './config/index.js';
import express from 'express';
import appRouter from './routes/index.js';

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    const server = Server.init();

    //* middlewares
    server.use(express.json());
    server.use(appRouter);
}
