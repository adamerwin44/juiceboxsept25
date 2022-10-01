// api/index.js copy from part 1 collecting common middleware
const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

//copied directly from part 2 6. working inside of api index .js
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

// set `req.user` if possible  cpoying from part 2 working insdie of api/index
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) { // nothing to see here  direct copy part 2
        next();
      } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
    
        try {
          const { id } = jwt.verify(token, JWT_SECRET);
    
          if (id) {
            req.user = await getUserById(id);
            next();
          }
        } catch ({ name, message }) {
          next({ name, message });
        }
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${ prefix }`
        });
      }
    });

//copied directly from part 1 middleware




apiRouter.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
});

module.exports = apiRouter;



// server.use(express.json())
