require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authStatus = require('./middleware/authStatus')

const apiRoutes = require('./routes');
app.use(express.json());
app.use(authStatus);
app.use('/', apiRoutes)



module.exports = app;