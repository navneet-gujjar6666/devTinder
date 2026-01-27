const express= require("express");
const authRouter= express.Router();
const { validateSignUpData }= require("../utils/validation.js");
const User= require("../models/userSchema.js");
const bcrypt= require("bcrypt");  //npm i bcrypt
const jwt= require("jsonwebtoken");  //npm i jsonwebtoken



/* Both means same
app.use("/test", middleWare, (req,res)=>{});
authRouter.use("/test", middleWare, (req,res)=>{});
*/

authRouter.post("/signup",async(req,res)=>{
    //Each APIs must follow this steps(1,2) as without this unhandled data can be inserted to the database
    //  and any one can read the data without Encryption
    //1.)Validation of Data
    //2.)Encrypt the password
    
    try{
        //Validation
        validateSignUpData(req);

        const { firstName, lastName, emailId, password }= req.body;

        //Encrypt the password (npm i bcrypt)
        const passwordHash= await bcrypt.hash(password, 10);
        console.log(passwordHash);
        
        //Creating new instance(collection) of the User Model
           //const user= new User(req.body); (it takes everything "xyz": "pagal" also)
           const user= new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
           });


    const savedUser = await user.save();
    const kyaBe = await savedUser.getJWT();

    res.cookie("token", kyaBe, {
                              expires: new Date(Date.now() + 8 * 3600000),
                              sameSite: "lax"
    });

    res.json({ message: "User Added successfully!", data: savedUser });
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

authRouter.post("/login2", async(req,res)=>{
     try{
        const { emailId,password }= req.body;

        const user= await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("EmailId id not present in DB");
        }
        const isPasswordVaild= await bcrypt.compare(password, user.password);
                      //OR
      //const isPasswordValid= await user.validatePassword(password);  

        if(isPasswordVaild){

            //Create a JWT Token, but first do-(npm i jsonwebtoken)
            //We can create token by our own also, but JWT gives the best and secure token
            const valueOk= await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: "1d"});
                      
                     //OR
            //const token= await user.getJWT();                
            //console.log(token);


            //Add the token to cookie and send the response back to the user
            //You can see it in cookies below url bar in Postman UI
            //This cookie will expire in 8hrs
            console.log("we are here at cokies");
            res.cookie("token",valueOk, {
                            expires: new Date(Date.now()+ 8*3600000),
                            sameSite: "lax"
                            });

            res.json(
                { message: "Login Succesfull:",
                  data: user
                }
            );
        }
        else{
            throw new Error("Password id not correct");
        }

     }catch(err){
            res.status(400).send("Error: "+ err.message);
     }
});

authRouter.post("/logout2", async(req,res)=>{
      res.cookie("token", null, {
        expires: new Date(Date.now())
      });

      res.send("Logout Sucessfull!!");
});

module.exports= authRouter;