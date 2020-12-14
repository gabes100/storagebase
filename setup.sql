DROP DATABASE storagebase;

create database storagebase;
use storagebase;


create table User (
	id INT AUTO_INCREMENT,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

create table GroceryOrder (
  id INT AUTO_INCREMENT,
  userId INT,
  name VARCHAR(255) NOT NULL,
  enterDate VARCHAR(255) NOT NULL,
  totalItems DECIMAL(10, 2) NOT NULL,
  totalPrice DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES User(id)
);

create table StorageUnit (
  id INT AUTO_INCREMENT,
  userId INT,
  storageName VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES User(id)
);

create table Item (
  id INT AUTO_INCREMENT,
  orderId INT,
  storageId INT,
  name VARCHAR(255) NOT NULL,
  expiration VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  itemType VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (orderId) REFERENCES GroceryOrder(id), 
  FOREIGN KEY (storageId) REFERENCES StorageUnit(id) 
);

INSERT INTO User
VALUES(1, 'Gabriel', 'Veldboom', 'gabriel.veldboom', '$2b$10$ORP3AYeSQA0tCXHV1sQQhOV4//0mlPDnEVvQTov/qOHDi3EuV7Svy');

INSERT INTO GroceryOrder VALUES
(1, 1, 'First Order', '2020-12-14', 11.00, 29.94),
(2, 1, 'Second Order', '2020-12-14', 40.00, 146.44);

INSERT INTO StorageUnit VALUES
(1, 1, 'Freezer'),
(2, 1, 'Refrigerator'),
(3, 1, 'Pantry 1');


INSERT INTO Item VALUES
(1, 1, 2, 'Eggs', '2021-01-14', 2.99, 'Dairy', 2),
(2, 1, 1, 'Ice Cream Snack', '2021-01-16', 0.99, 'Dairy', 1),
(3, 1, 1,'Frozen Pizza', '2021-02-12', 2.00, 'Other', 5),
(4, 1, 3, 'Bread', '2021-01-16', 2.99, 'Grain', 1),
(5, 1, 2, 'Beef (1 pound)', '2021-01-16', 5.99, 'Meat', 1),
(6, 1, 2, 'Butter', '2021-01-16', 3.99, 'Dairy', 1),
(7, 2, 2, 'Sour Cream', '2020-12-31', 3.99, 'Dairy', 1),
(8, 2, 3, 'Corn Flakes', '2022-04-12', 4.99, 'Grain', 3),
(9, 2, 3, 'Mac And Chese', '2024-01-01', 0.99, 'Grain', 5),
(10, 2, 3, 'Peanut Butter', '2021-05-04', 3.46, 'Other', 1),
(11, 2, 3, 'Jelly', '2021-01-16', 2.00, 'Other', 1),
(12, 2, 3, 'Chocholate Chips', '2022-03-15', 3.99, 'Other', 3),
(13, 2, 3, 'Noodles', '2021-01-26', 5.99, 'Grain', 4),
(14, 2, 3, 'Salt', '2021-01-05', 1.29, 'Other', 1),
(15, 2, 1, 'Chicken', '2021-01-20', 5.99, 'Meat',10),
(16, 2, 2, 'Waffles', '2022-07-16', 4.99, 'Grain', 2),
(17, 2, 1, 'Frozen Peas', '2021-01-16',3.99, 'Vegetable', 2),
(18, 2, 3, 'Creamed Corn', '2021-01-15', 2.99, 'Vegetable,', 5),
(19, 2, null, 'Chicken Noodle Soup', '2021-01-16', 0.99, 'Other', 2);