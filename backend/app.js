const express= require("express");
const connectDB= require("./config/database.js");
const app= express();
const User= require("./models/userSchema.js");
const validator= require("validator");
const {validateSignUpData}= require("./utils/validation.js");
const bcrypt= require("bcrypt");  //npm i bcrypt
const cookieParser= require("cookie-parser");  //npm i cookie-parser
const cors= require("cors"); //npm i cors


app.use(cors({                      //This will solve the crossOriginConnection error between frontEnd and backEnd
  origin: "http://localhost:5173", // Vite frontend
  credentials: true
})); 
app.use(express.json()); //Used for converting raw string body data into object string data then putting inside-(req.body)
app.use(cookieParser()); //Same usement like above, used for req.cookie= token, putting token into req.cookie, this both
//method are known as parsing: The process of putting raw readable string data into req.body or cookie in structured readable
//object form

//As compare this folder's with its predecessor's folder, this folder looks clean as all the routes handled in different section


const profileRouter= require("./routes/profile.js");
const requestRouter= require("./routes/requests.js");
const authRouter= require("./routes/authRoutes.js");
const userRouter= require("./routes/userRoutes.js");


//When ever any request comes it will go in this flow first-->profileRouter-->then requestRouter, authRouter, userRouter
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", authRouter);
app.use("/", userRouter);



app.post("/signup",async(req,res)=>{
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
            password: passwordHash
           });
    await user.save();
    res.send("User added successFully!");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

app.post("/login1", async(req,res)=>{
     try{
        const { emailId,password }= req.body;

        const user= await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("EmailId id not present in DB");
        }
        const isPasswordVaild= await bcrypt.compare(password, user.password);

        if(isPasswordVaild){
            res.send("Login Succesfully");
        }
        else{
            throw new Error("Password id not correct");
        }

     }catch(err){
            res.status(400).send("Error: "+ err.message);
     }
});


//Get user by email
/* Steps:
  1.)write in postman req body this:
          {
            "emailId": "akshay@Saini.com"
          } 
*/
app.get("/email",async(req,res)=>{
   
    const userEmail= req.body.emailId;
    try{
        const user= await User.find({emailId: userEmail});
        if(user.length===0){
          res.status(404).send("User not found");
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});


//Feed API-GET/feed-get all the users from the database(getting all the data)
app.get("/feed",async(req,res)=>{
    try{
        const users= await User.find({});
            res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});



//Delete
/*
1.) create DELETE API in postman then type in response(res) body of postman UI as: ,
      {
        "userId":"686876878978686edsrs"
        }
*/
app.delete("/sideMeKaro",async(req,res)=>{
   const ok= req.body.userId;
    try{
        const users= await User.findByIdAndDelete(ok);
      //const users= await User.findByIdAndDelete({ _id: ok });  
            res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});


//UPDAte
/*
1.) create PATCH API in postman then type in response(res) body of postman UI as: ,
      {
        "userId": "686876878978686edsrs", //(constant ID dont want to change)
        "firstName": "akshayyyyyy",       //(new name and want to replace with old one)
        "emailId": "akshay@gjjar.com"     //(new email and want to replace with old one)
        }
*/
app.patch("/update",async(req,res)=>{
   const ok= req.body.userId;
   const data= req.body;
    try{

        const ALLOWED_UPDATES= ["userId","photoUrl","about","gender","age","skills"];
        
        const isUpdateAllowed= Object.keys(data).every((k)=>
                ALLOWED_UPDATES.includes(k)
        );
 
        if(!isUpdateAllowed){
           throw new Error("Updated not allowed");
        }
        if(data?.skills.length> 10){//can be done through schema.js also
           throw new Error("Skills cannot be more than 10");
        }
        // if (!validator.isEmail(data.email)) { currently done by schema.js
        //    throw new Error("Invalid email address: " + data.email);
        // }

        const users= await User.findByIdAndUpdate({_id: ok}, data,{
            //options
            returnDocument: "after", //returns the new document (the one after the update)
            runValidators: true //Without this validate function works only for new entry, not for(PATCH) update http
        });
      //const users= await User.findByOneAndUpdate({ email: ok }, data); (for updating through)
                                                                                     //emailId  
            res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});



//COOKIES and JWT

connectDB("APIs")
       . then(()=>{
        console.log("Database connection estabilized");
        app.listen(5000,()=>{
            console.log("Server is successfully listening on port 5555...");
        });
       })
       .catch((error)=>{
        console.error("Database cannot be connected!");
       });