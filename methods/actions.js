var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/dbconfig');
const { authenticate } = require('passport');


var functions = {


    //New User function------------------------------------------------------------
    addNew:function(request,response){
        if((!request.body.name)||(!request.body.password)){
            response.send({success: false,message:'Enter all fields'});
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
    authenticate: function(response,request){
        User.findOne({//this findOne method will search for the user with given user name and return the document
            name:request.body.name,
        },function(err,user){
            if(err) throw err
            if(!user){
                response.status(403).send({success:false,message:'user authentication failed, User not found'});
            }else{
                User.comparePassword(request.body.password,function(err,isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user,config.secret);//Create token
                        response.json({success:true,token:token});//send token back to user when authenticated
                    }else{
                        return response.status(403).send({success:false,message:'Authentication failed, password failed.'})
                    }
                })
            }
        }
        
        );

    },//End of the authenticate method


}


module.exports = functions;