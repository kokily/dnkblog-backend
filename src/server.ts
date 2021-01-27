import https from 'https';
import http from 'http';
import fs from 'fs';
import './libs/env';
import app from './app';

// SSL Config
const configurations = {
  production: { ssl: true, port: 443, hostname: 'api.dnkdream.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' },
};

const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];

let server;

if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync(`${process.env.SSL_KEY}`),
      cert: fs.readFileSync(`${process.env.SSL_CERT}`),
    },
    app.callback()
  );
} else {
  server = http.createServer(app.callback());
}

server.listen(config.port, () => {
  console.log(
    `Server on http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}`
  );
});
