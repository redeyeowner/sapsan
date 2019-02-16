const fs = require('fs');

const encode = 'utf-8';
const baseConfig = {
  environment: process.env.ENV,
};
let configPath = 'development.json';
if (baseConfig.environment === 'production') {
  configPath = 'production.json';
} else if (baseConfig.environment === 'staging') {
  configPath = 'staging.json';
}

const data = fs.readFileSync(`${__dirname}/${configPath}`, encode);

module.exports = Object.assign({}, baseConfig, JSON.parse(data));
