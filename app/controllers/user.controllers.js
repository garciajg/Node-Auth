const app = require('../../server').app;
const express = require('express');

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.json({message: "Welcome to the coolest API"});
}); 

module.exports = apiRoutes;