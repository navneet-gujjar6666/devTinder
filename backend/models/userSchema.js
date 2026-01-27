const mongoose = require('mongoose');
const validator= require("validator");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");


// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
         type: String,
         required: true,
         minLength: 4,
         maxLength: 50
    },
    lastName: {
         type: String
    },
    emailId: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){ //first do(npm i validator) then validator= require("validator"); in app.js
                throw new Error("Invalide email address: "+ value);
            }
        }
    },
    password: {
         type: String,
         required: true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("your password is not strong: "+ value);
            }
        }
    },
    age:{
         type: String,
         //min: 18
         default: "18"
    },
    gender: {
         type: String,
        // enum: ['Male', 'Female', 'Other']
        default: "male",
        validate(value){
           if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid");
           }
        }
    },
    photoUrl: {
          type: String,
          default: "https://shhjshja.com",
          validate(value){
            if(!validator.isURL(value)){ //first do(npm i validator) then validator= require("validator"); in app.js
                throw new Error("Invalide photo URL: "+ value);
            }
        }
    },
    about: {
        type: String,
        default: "Hey I'm"
    },
    skills: {
        type: [String],
        // validate: {  (Either use this or comment this and use the code written in the app.js )
        //       validator: (arr)=>{
        //                     return  arr.length <= 4
        //                    },
        //       message: "A user can have at most 4 skills"
        // }
    },
    /*
    createdAt: {
        type: Date
    }
    */
},{
    timestamps: true
});


//Now this below handling is very difficult to understand, but i wrote for future
//They are for made the app.js file smaller, so like passing extra code here 

userSchema.methods.getJWT= async function(){
    const user= this;
    //this: it is pointing to the current instance(example), like (akshay or raj or elon)

    const token= await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: "7d"});

    return token;
};

userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user= this;
    const passwordhash= user.password; //or this.password;

    const isPasswordValid= await bcrypt.compare(
        passwordInputByUser,
        passwordhash
    );

    return isPasswordValid;
}

userSchema.index({ firstName: 1, lastName: 1});//This makes searching easy in DB as many similar names
//can be identify in easy and fast manner: virat kohli,virat gurjar,virat sharma,...to millions entry searching is solved by this

// Check below: User.find({ firstName: "Akshay", lastName: "Saini"});
userSchema.index({ gender: 1});
userSchema.index({ age: 1});
//Example:
/*
age index:
18 → [docId3, docId8]
25 → [docId1]
30 → [docId2, docId7]
*/


// Create a User model from the schema
const User = mongoose.model('diveIntoDeep', userSchema);

User.find({ firstName: "Akshay", lastName: "Saini"});

module.exports = User;