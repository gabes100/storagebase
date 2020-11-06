const express = require('express');

function createRouter(db) {
   const router = express.Router();

   router.post('/user', (req, res, next) => {
   db.query
	   ('INSERT INTO user (username, firstname, lastname, password) VALUES (?,?,?,?)',
    [reg.body.username, req.body.firstname, req.body.lastname, req.body.password],
    (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
        res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
