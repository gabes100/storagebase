 const express = require('express');

function createRouter(db) {
   const router = express.Router();

   // Create Item
   router.post('/item', (req,res) => {
    
    let newItem = {
      name : req.body.name,
      expiration : req.body.expiration,
      price : req.body.price,
      quantity : req.body.quantity,
      itemType : req.body.itemType,
      orderId : req.body.orderId,
    }

    db.query('INSERT INTO Item SET ?',newItem, function (error, results) {
      if (error) {
        res.status(402).json();
      } else {
        res.json(newItem); // success return item
      }
    });
  });

  // get items by orderId
  router.post('/item/order', (req,res) => {
    db.query('SELECT * FROM Item WHERE orderID = ?', req.body.orderID, function (error, results) { 
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
