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
      typeId : req.body.typeId,
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

  // Update item storage unit
  router.post('/item/unit', (req,res) => {
    var query = 'UPDATE Item SET storageId =' +req.body.storageId + " WHERE id = " + req.body.itemId;
      db.query(query, function (error, results) {
        if (error) {
          res.status(402).json();
        } else {
          res.json(results); // success return item
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

   // remove an item
   router.post('/item/remove', (req,res) => {
    db.query('DELETE FROM Item WHERE id = ?', req.body.itemId, function (error, results) { 
        if (error) {
            res.status(402).json();
        } else {
            res.json(results); 
        }
    });
  });

  // get items by storageID
  router.post('/item/unitname', (req,res) => {
    db.query('SELECT * FROM Item WHERE storageID = ?', req.body.storageId, function (error, results) { 
        if (error) {
            res.status(402).json();
        } else {
            res.json(results); 
        }
    });
  });

  // get items by name
    router.post('/item/itemname', (req,res) => {
      var query = 'SELECT * FROM Item WHERE name LIKE \'%'+ req.body.searchString + '%\''; 
      db.query(query, req.body.storageId, function (error, results) { 
          if (error) {
              res.status(402).json();
          } else {
              res.json(results); 
          }
      });
    });


  // get items with expiration
  router.post('/item/expire', (req,res) => {
    var query = `SELECT * FROM Item WHERE id IN 
                          (SELECT Item.id FROM Item INNER JOIN GroceryOrder ON 
                            Item.orderId = GroceryOrder.id 
                          WHERE userid = ` + req.body.userId + ') ' + 
                'AND Item.expiration <= DATE(CURDATE() + 3);';
    db.query(query, function (error, results) { 
        if (error) {
            res.status(402).json();
        } else {
            res.json(results); 
        }
    });
  });
  // get items with no storages
  router.get('/item/nostorage', (req,res) => {
    db.query('SELECT * FROM Item WHERE storageID is null', function (error, results) { 
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
