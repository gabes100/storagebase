const express = require('express');

function createRouter(db) {
 const router = express.Router();

   // Create unit
   router.post('/storageunit', (req,res) => {

    let newUnit = {
      storageName : req.body.storageName,
      userId : req.body.userId,
    }

    db.query('INSERT INTO StorageUnit SET ?',newUnit, function (error, results) {
      if (error) {
        res.status(402).json();
      } else {
        const unitWithId = {
          ...newUnit,
          id: results.insertId,
        }
        res.json(unitWithId); // success return order
      }
    });
  });

  // get storageUnit by name
  router.get('/storageunit', (req,res) => {
    var query = `SELECT StorageUnit.id as id, storageName, count(*) as count FROM Item 
    INNER JOIN StorageUnit ON Item.storageId = StorageUnit.id 
    GROUP BY StorageUnit.storageName
    HAVING count >= 1`;

    db.query(query, function (error, results) {
        if (error) {
            res.status(402).json();
        } else {
            res.json(results);
        }
    });
  });

  // get storageUnit by name
  router.get('/storageunit/unitonly', (req,res) => {
    db.query('SELECT * FROM StorageUnit', function (error, results) {
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
