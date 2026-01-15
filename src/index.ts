import { Server } from './config';

(async () => {
    await main();
})();

async function main() {
    Server.init();
}


