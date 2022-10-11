require('dotenv').config();
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3005;

const dev = process.env.NODE_ENV === 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.static(path.join(__dirname, 'public')));

    server.use(
      bodyParser.urlencoded({
        extended: false,
      }),
    );

    server.use(bodyParser.json());
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    server.use(cookieParser());

    server.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'public,max-age=31536000');
      return handle(req, res);
    });

    // craete server with port
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
