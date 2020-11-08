const express = require('express');
const bcrypt = require('bcrypt');

function createRouter(db) {
   const router = express.Router();

   // User Register
   router.post('/register', (req,res) => {
    let newUser = {
      firstname : req.body.firstName,
      lastname : req.body.lastName,
      username : req.body.username,
      password : bcrypt.hashSync(req.body.password, 10)
    }

    db.query('INSERT INTO User SET ?',newUser, function (error, results) {
      if (error) {
        res.status(402).json();
      } else {
        const userNoPassword = {
          id : results.insertId,
          username : req.body.username,
          firstname : req.body.firstName,
          lastname : req.body.lastName
        };
        res.json(userNoPassword); // success return user
      }
    });
  });

  // User Login
  router.post('/login', (req,res) => {
    const username= req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM User WHERE username = ?',[username], function (error, results) { 
      if (error) {
        res.status(402).json();
      } else {
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, (err2, isValid) => {
            if(err2 || !isValid){
              res.status(402).json();
            }
            else{
              const userNoPassword = {
                id : results[0].id,
                username : results[0].username,
                firstname : results[0].firstname,
                lastname : results[0].lastname
              };

              res.json(userNoPassword); // success return user
            }
          });
        } else {
          res.status(402).json();
        }
      }
    });
  });

  return router;
}

module.exports = createRouter;
