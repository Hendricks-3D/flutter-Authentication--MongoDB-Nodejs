const express = require('express');
const actions = require('../methods/actions');
const  router = express.Router();

router.get('/',(request,response)=>{
    response.send("home page");
});

router.get('/dashboard',(request,response)=>{
    response.send("dashboard");
});


//@desc Add new user
//@route POST /adduser
router.post('/addUser',actions.addNew)

//@desc authenticate user
//@router get /authenticateUser
router.post('/authenticateUser',actions.authenticate)



module.exports = router;