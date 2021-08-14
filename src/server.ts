import { App } from './app'
import AppEnvs from './config/application';
async function main() {
    const app = new App( AppEnvs.loadEnvs().port );
    await app.listen();
}
main();