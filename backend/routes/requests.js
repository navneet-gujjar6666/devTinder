const express= require("express");
const requestRouter= express.Router();
const { userAuth }= require("../middleWares/auth.js");
const connectionRequestModel = require("../models/connectionRequest.js");
const User= require("../models/userSchema.js");
const { Connection } = require("mongoose");

/* #CONCEPT:
  -Static:
    "/request/send/intrested/Id"
    "/request/send/ignored/Id"
           
  -Dynamic:
     "/request/send/:status/:toUserId"
*/

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
         //Without this middleWare(userAuth) any can send request but including this allows only to
         //authanticated user only
         try{
            const fromUserId= req.user._id;
            const toUserId= req.params.toUserId;
            const status= req.params.status;

            //Validations:
            const allowedStatus= ["ignored","interested"];
            if(!allowedStatus.includes(status)){
                  return res.status(400).json({message: "Invalid status type: "+status});
    
            }

            //checking whether the client(toUserId) present in owners DB or not
            const clientInDb= await User.findById(toUserId);
            if(!clientInDb){
                 return res.status(404).json({message: "User not found!"});
            }   

            
            /* We have done this approach in connectionRequest.js named as-(identicalApproach)

            if (String(fromUserId) === String(toUserId)) {
                  return res.status(400).json({
                  message: "Cannot send connection request to yourself"
                  });
            }
            */

            const existingConnectionRequest= await connectionRequestModel.findOne({
              $or: [
                {fromUserId, toUserId}, //checking entry already exist in DB
                {fromUserId: toUserId, toUserId: fromUserId} //checking biDirectionalRequest
              ]
            });
            if(existingConnectionRequest){
                return res.status(400).send({message: "Connection Request Already Exists!"});
            }
            
            //Extra information:
            const from= req.user.firstName;
            const to= clientInDb.firstName;

            const connectionRequest= new connectionRequestModel({
                fromUserId,
                from,
                toUserId,
                to,
                status
            });

            const data= await connectionRequest.save();

            res.json({
                //message: "Connection Request Sent Successfully!",
                message: req.user.firstName + " is "+ status + " in " + to,
                data
            });
         }catch(err){
              res.status(400).send("ERROR: "+ err.message);
         }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
       try{
          //In apiList.md telling about this api is for understanding but actually this do like in here:
          //Navneet-->sended-->elon then now according to this api navneet is not reviewing,
          //actually elon is currently logged in as admin and he is reviewing this api, that navneet's request he is
          //reviewing
           const loggedInUser= req.user;
           const { status, requestId }= req.params;

           const allowedStatus= ["accepted","rejected"];
           if(!allowedStatus.includes(status)){
                return res.status(400).json({message: "Status not allowed!: "});
           }

//Thodi is difficulty arhi thi requestId ko leke actually apn soch rhe thai ki requestId wo hai jisne request bheji h means
//if navneet-->elon then now elon reviewing it and he will see like requestId: fromUserId(navneet) but essa asli m nhi hain
//asliyat m requestId wo id jesse 10documents h sbki ek uniqueId h(0,1,2,3) ussi prakar elon as admin k pass 10 requestsId
//ayyi h different user se so, requestId(0,1,2,3,4) wo check kr rha h one by one, so finally apn ko ye samj ayaa ki
//requestId document ki ID h na ki fromUserId hai. 


/*  
                                    :FINAL EXPLAINATION:
     1.] When Navneet loggedIn and intrested in Elon and sended request using API above this current API, in DB document be like:
          {
            ._id: ObjectId('AB1')
            fromUserId: ObjectId('kkkk')                 ----Navneet
            toUserId: ObjectId('llll')                   ----Elon
            status: Interested
          }
      
     2.] When Elon loggedIn and checking the requestsDB-(the above document is also stored in this DB only) and trying to
         found this:
          const ok= {
              ._id: ObjectId('AB1')
              toUserId: ObjectId('llll')                  ----Elon
              status: Interested
          } and he will definitedly found this then after that status: updated-(from Interested to acceptd or rejected)
          
      3.] Now the Question is what is requestId, so like Elon will loggIn from postmanUI then he have documentsId-(0,1,2,3) this
          all documentsIds are requestIds, so like Elon is now reacting to every requestId, so he wrote in postmanUI for accepting
          Navneet request as:--->   ( localHost:9999/request/review/accepted/AB1 )
 */
    
          const ok= await connectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
           });

           if(!ok){
              return res.status(400).json({message: "Connection request not found"});
           }

           ok.status= status;

           const data= await ok.save(); //by just writting this how will this update to mongoDB document as because of,
//when doing ConnectionRequest.findOne(); it returns: (neededDocument, collectionName, DBconnection hidden url)           

           res.json({ message: " Connection request "+ status, data});
           
       }catch(err){
           res.status(400).send("ERROR: at ln144 "+ err.message);
       }
});

module.exports= requestRouter;