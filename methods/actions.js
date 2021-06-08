var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/dbconfig');
//const  authenticate  = require('passport');


var functions = {


    //New User function------------------------------------------------------------
    addNew:function(request,response){
        if((!request.body.name)||(!request.body.password)){
            response.status(500).send({success: false,message:'Enter all fields'});
        }else{

            //create new user if no error found
            var newUser = User({
                name:request.body.name,
                password:request.body.password,
                carType:request.body.carType
            });
            //save new user with new data added
            newUser.save(function(err,newUser){
                if(err){
                    response.json({success:false,message:'fail to save'});
                }else{
                    response.json({success:true,message:'saved successfully!'});
                }
            })
        }
    },//end of add new user




    //Authenticate user----------------------------------------------------------------
    //This method will utilize the comparePAssword method on the 
    //user model to compare the user input password with the one coming from the database.
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }

                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                        }
                    })
                }
        }
        )
    },


}


module.exports = functions;