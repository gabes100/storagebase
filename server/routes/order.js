 const express = require('express');

function createRouter(db) {
   const router = express.Router();
   
   // Create Order
   router.post('/order', (req,res) => {

    let newOrder = {
      name : req.body.name,
      enterDate : req.body.enterDate,
      totalPrice : req.body.totalPrice,
      totalItems : req.body.totalItems,
      userId : req.body.userId,
    }

    db.query('INSERT INTO GroceryOrder SET ?',newOrder, function (error, results) {
      if (error) {
        res.status(402).json();
      } else { 
        const orderWithId = {
          ...newOrder,
          id: results.insertId,
        }
        res.json(orderWithId); // success return order
      }
    });
  });

  // get order by name
  router.get('/order', (req,res) => {

    db.query('SELECT * FROM GroceryOrder', function (error, results) { 
        if (error) {
            res.status(402).json();
        } else {
            res.json(results); 
        }
    });
  });

  return router;
}

module.exports = createRouter;
