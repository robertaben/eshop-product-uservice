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

## Running in a Docker Container
#### Setting up a MySQL server, run on Docker Container
* $ docker run --name mysql --rm -e MYSQL_ROOT_PASSWORD=mysqlpw --security-opt seccomp=unconfined -p 6606:3306 -d mysql

#### Creating eshop-product-uservice image
* $ docker build -t eshop-product-uservice .

#### Run created image on Docker Container 
* check mysql host address -> $ docker ps -> $ docker inspect mysql_container_ID
* check mysql username and password, if needed can be passed throuh "-e DBUSER=user" "-e DBPASS=pass"
* $ docker run -d --rm -p 11011:3000 -e DB_PORT=6606 -e DB_HOST=172.17.0.1 --link mysql eshop-product-uservice

## Test with Postman
* GET http://localhost:11011/products/
* POST http://localhost:11011/products Body: {"name": "no name", "description": "no description", "price": 0.01}
* PUT http://localhost:11011/products Body: {"name": "name", "description": "description", "price": 1.00}
* DELETE http://localhost:11011/products/1
* DELETE http://localhost:11011/products 

## Copyright
©Roberta
