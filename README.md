# nodejs-eshop-product-service

Product part of microservices eshop application

## Built with
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [express-validator](https://express-validator.github.io/docs/)

## External Tools Used
* [Postman](https://www.getpostman.com/)

## Start
* install all dependencies $ npm install
* create .env and fill in with DBUSER (database username) DBPASS (database password)
* to start $ node app.js or if using [nodemon](https://nodemon.io/) $ nodemon

## Test with Postman
* GET http://localhost:3000/products/
* POST http://localhost:3000/products Body: {"name": "no name", "description": "no description", "price": 0.01}
* PUT http://localhost:3000/products Body: {"name": "name", "description": "description", "price": 1.00}
* DELETE http://localhost:3000/products/1
* DELETE http://localhost:3000/products 

## Copyright
©Roberta
