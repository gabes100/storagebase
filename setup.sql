create database storagebase;
use storagebase;

create user 'default'@'localhost' identified by 'password';
grant all on default.* to 'default'@'localhost';

create table User (
  id INT AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL, 
  PRIMARY KEY (id)
);

create table GroceryOrder (
  id INT AUTO_INCREMENT,
  userId INT,
  name VARCHAR(255) NOT NULL,
  enterDate VARCHAR(255) NOT NULL,
  totalItems NUMERIC NOT NULL,
  totalPrice NUMERIC NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES User(id)
);

create table Item (
  id INT AUTO_INCREMENT,
  orderId INT,
  name VARCHAR(255) NOT NULL,
  expiration VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  itemType VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (orderId) REFERENCES GroceryOrder(id) 
);

create table StorageUnit (
  id INT AUTO_INCREMENT,
  userId INT,
  storageType VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES User(id)
)`;

