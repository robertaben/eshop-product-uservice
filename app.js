require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to eshop-product-uservice application"});
});

require("./routes/products.routes.js")(app);
require("./routes/categories.routes.js")(app);
require("./routes/warehouses.routes.js")(app);
require("./routes/inventory.routes.js")(app);

app.listen(process.env.PORT || 3000, () => {
    console.log(`The server is running on port: ${process.env.PORT || '3000'}`);
});