const { Sapsan } = require('../../index');
const AppController = require('./app/app.controller');
const Configs = require('./config');

async function bootstrap() {
  try {
    const app = await new Sapsan();
    await app.init(AppController, Configs);

    app.start();
  } catch ({ message }) {
    console.error(message);
  }
}
bootstrap();
