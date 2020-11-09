 const express = require('express');

function createRouter(db) {
   const router = express.Router();

   // Create Order
   router.post('/order', (req,res) => {
    
    let newOrder = {
      orderName : req.body.orderName,
      orderDate : req.body.orderDate,
    }

    db.query('INSERT INTO GroceryOrder SET ?',newOrder, function (error, results) {
      if (error) {
        res.status(402).json();
      } else {
        res.json(newOrder); // success return order
      }
    });
  });

  // get order by name
  router.get('/order', (req,res) => {
    console.log(reg);

    db.query('SELECT * FROM GroceryOrder', function (error, results) { 
        if (error) {
            res.status(402).json();
        } else {
            console.log(results);
            res.json(results); 
        }
    });
  });

  return router;
}

module.exports = createRouter;
