const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const user = require('./routes/user');
const order = require('./routes/order');
const item = require('./routes/item');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'default',
  password : 'password',
  database : 'storagebase'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(user(connection))
  .use(item(connection))
  .use(order(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
