var mongoose = require ('mongoose');
var schema = mongoose.schema;
var bcrypt = require('bcrypt');//Used to encrypt the password
const { Schema } = require('mongoose');
var userSchema= new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    carType:{
        type:String,
        require:true
    },
});


//Encrypt user password------------------------------------------------------------------------
userSchema.pre('save',function(next){
    var user = this;
    if(this.isModified('password')|| this.isNew){
        bcrypt.genSalt(10,function(err,salt){//creating salt and use it to hash the password
            if(err){
                return next(err);
            }

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err){
                    return next(err);//next() is used  instead of return err, to notify server
                }

                user.password = hash;//assign hash value to password
                next();
            })
        })
    }else{
        return next();
    }
});
//End of password encryption


//Method that will  compare the hash password and the  given password-----------------------------
userSchema.methods.comparePassword = function(pass, callback){
    bcrypt.compare(pass,this.password,function(err,isMatch){
        if(err){
            return callback(err);
        }

        callback(null,isMatch);
    });
}

module.exports = mongoose.model('User',userSchema)
