const express = require("express");


const connectdb = require("./db");
const app = express();
const port = 3000;

// DB connection
connectdb();

// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PersonRoutes = require("./Routes/PersonRoutes");
const MenuRoutes = require("./Routes/MenuRoutes");

app.use("/person",PersonRoutes);
app.use("/menu",MenuRoutes);


// Start server
app.listen(port, () => console.log(`App listening on port ${port}!`));
