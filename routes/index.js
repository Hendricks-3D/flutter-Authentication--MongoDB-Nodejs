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
//@router POST /authenticateUser
router.post('/authenticateUser',actions.authenticate);

//@desc get user info
//@router get 
router.get('/getUser',actions.getUser);

module.exports = router;