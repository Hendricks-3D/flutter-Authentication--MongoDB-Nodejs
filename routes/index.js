const express = require('express');
//const acions = require('../methods/actions');
const  router = express.Router();

router.get('/',(request,response)=>{
    response.send("working");
});

module.exports = routes;