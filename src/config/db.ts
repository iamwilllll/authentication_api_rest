import mongoose from 'mongoose';
import { env } from './env.js';
import { exit } from 'node:process';
import colors from 'colors';

export class Database {
    static async connect() {
        const url = env.DB.URL;

        try {
            if (!url) throw new Error('database url is not defined');
            const { connection } = await mongoose.connect(url);
            console.log(colors.cyan.bold(`databse was sucessfull connection on ${connection.host}:${connection.port}`));
        } catch (err) {
            console.log(err);
            exit(1);
        }
    }
}
