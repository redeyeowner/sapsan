const Sapsan = require('../../index');
const AppController = require('./app/app.controller');
const Configs = require('./config');

async function bootstrap() {
  try {
    const app = await new Sapsan(new AppController(), new Configs());
    await app.initConfig(new Configs());
    await app.initApplication(new AppController());

    app.start();
  } catch ({ message }) {
    console.error(message);
  }
}
bootstrap();
