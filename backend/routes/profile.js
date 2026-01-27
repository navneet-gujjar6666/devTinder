const express= require("express");
const profileRouter= express.Router();
const { userAuth }= require("../middleWares/auth.js");
const { validateEditProfileData }= require("../utils/validation.js");


profileRouter.get("/profile/view", userAuth, async(req,res)=>{

    try{
      
       const user= req.user;

       
       res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
        try{
            if(!validateEditProfileData(req)){
                throw new Error("Invalid Edit Request");
                       //OR
                   //return res.status(400).send("Invalid Edit Request");    
            }

            const loggedInUser= req.user;
            console.log(loggedInUser);

            /* Very Time-consuming as:
            loggedInUser.firstName= req.body.firstName;
            loggedInUser.lastName= req.body.lastName;
            */

            //Best way:
            Object.keys(req.body).forEach((key)=> {loggedInUser[key]= req.body[key]});
            console.log(loggedInUser);
            
            await loggedInUser.save(); //Without this we will se updated version in console only not in DataBase
            res.send(`${loggedInUser.firstName}, your profile updated succesfully`);
        //res.json({message: `${loggedInUser.firstName}, your profile updated succesfully`, data: loggedInUser});

        }catch(err){
             res.status(400).send("ERROR:" +err.message);
        }
});

//Do H.W check you whatsapp you have written therezzz

module.exports= profileRouter;