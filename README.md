# Storage Base

This is a web application that tracks item expiration dates in a fridge, freezer, or pantry and keeps track of grocery bill orders. The website is able to display what is in a user’s storage unit as well as past grocery orders. 

## Installation

Make sure you have Angular, NodeJs, and MySql (mariadb) installed.

## Running program

Open 3 terminals and run the folling in order:
Anywhere in one of the terminals run:
```
mysql
```
On mysql terminal, create a database called `storagebase`

Create a user called `default` and grant all privledges on that database

Then run the setup.sql script to get the database setup

In the next terminal, cd into the server folder and run:
```
node index.js
```

In the last terminal, cd into the client folder and run:
```
ng serve
```

Open a browser and go to http://localhost:4200 to see the program
