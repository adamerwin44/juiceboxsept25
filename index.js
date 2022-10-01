


require('dotenv').config();
//direct copy from part 1 start a web server
//// inside index.js

const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());


const apiRouter = require('./api');
server.use('/api', apiRouter);

// copied from part one routes near the bottom 
const { client } = require('./db');
client.connect();


const { PORT = 3000 } = process.env;
server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
