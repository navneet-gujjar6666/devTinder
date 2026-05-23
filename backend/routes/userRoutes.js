const express= require("express");
const userRouter= express.Router();
const connectionRequestModel= require("../models/connectionRequest.js");
const User= require("../models/userSchema.js");

const { userAuth}= require("../middleWares/auth.js");
//Akshay saini was getting error as he was using only const userAuth as he thinked that it was exported as function,
//but actually it was exported as object {userAuth} so here also we have to do const {userAuth}.

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try{
        const loggedInUser= req.user;

        const ok= await connectionRequestModel.find({
           toUserId: loggedInUser._id,
           status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl"]);
        //.populate("fromUserId", "firstName lastName age");

        res.json({
            message: "Data fetched successfully",
            data: ok
        });

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});





const USER_SAFE_DATA= "firstName lastName photoUrl age gender about skills  experience headline location";
//This api used to show how many connections the current loggedIn user has
userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
        const loggedInUser= req.user;
        //Navneet-->elon
        //Elon-->mark, we want all the connections of elon that is(2) as he has two friends(Navneet, mark)

        const ok= await connectionRequestModel.find({
           $or: [
            { toUserId: loggedInUser._id, status: "accepted"},
            { fromUserId: loggedInUser._id, status: "accepted"}
           ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        //const data= ok.map((row)=> row.fromUserId);
        //Without this we are getting all rows like-(fromUserId, toUserId, createdAt, etc..) but this (map) gives only
        //fromUserId values not all attributes values
 

//We have used this complicated version in below as because of:
//    request.js(interested): donaldTrumph-->elon
//    request.js(accepted): elon recieved donalTrumph  
//    userRoutes.js(connections): three(Navneet, mark, donaldTrumph) all three are accepted
//Pata nhi yeh sending, recieving process upr kyu likhi hai but ye nechee wale ka mtlb ye h ki hum jab bs fromUserId
//wala row use kr rhe the jab hume shi data nhi mil raha tha kyunki shi data toUserId m tha  
        const data= ok.map((row)=>{
            if( row.fromUserId._id.toString() === loggedInUser._id.toString() ){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        
        res.json({ data });

    }catch(err){
        req.status(400).send("ERROR: "+err.message);
    }
});







//This below api is of like when we login to devTinder then we get 30profiles in first is because of this api, then after
//watching this 30profiles this below api will fetch 30new profiles.
userRouter.get("/feed", userAuth, async(req,res)=>{
    try{
         //User should see all the user cards except
         //0. his own card
         //1. his already connections
         //2. already i ignored people
         //3. already sent the connection request

         //Explaination as:
         //Total people= [akshay, mark, donald, MSdhoni, virat, rahul, elon];
         //When rahul loggin= [akshay, mark, donald, MSdhoni, virat, elon];
         //     and if (R->Akshay->rejected, R->Elon->accepted, R->donald->pending) then,
         //rahul now sees= [mark, MSdhoni, virat];
         //akshay see= [mark, donald, MSdhoni, virat, elon]; not(RAHUL) because already have interected.

        
         const loggedInUser= req.user;

         //Find all connection requests(sent + receieved)
         const ok= await connectionRequestModel.find({
            $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
         }).select("fromUserId toUserId"); //Select is used to show only needed attributes

         const hideUsersFromFeed= new Set(); //Set is used for making array in which
         //if entity already entered then duplication of that same is not allowed
         ok.forEach((kya)=>{
            hideUsersFromFeed.add(kya.fromUserId.toString());
            hideUsersFromFeed.add(kya.toUserId.toString());
         });
         //Earlier i was thinking that hideUsersfromfeed will have:
         //[{donald,virat},{donald,akshay},{sachin,donald}, not this-(virat,donald)], but actually it will have this:
         //[ donald, virat, akshay, sachin ]
        console.log(hideUsersFromFeed);


       
       
//Notes:
//1.) req.query.page is used for as orginal API: "/feed/users?page=2&limit=10" written in the PostMan api, for here it is
//    written as  userRouter.get("/feed/users or /feed/users?page=2&limit=10");
//2.) req.params.page is used for as orginal API: "/feed/users/2" written in the PostMan api, for here it is
//    written as userRouter.get("/feed/users/:page");
        const page= parseInt(req.query.page) || 1;
        let limit= parseInt(req.query.limit) || 10;
        limit= limit>50 ?  50 : limit;
        const skip= (page-1)*limit;       
//For understanding this-(skip, limit) concept go and see the apiList.md once first
              
        //Now taking only that users that are not coming in any(4) condidtions that we have disccussed firstly at above
        const users= await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } }, //$nin: not in
                { _id: { $ne: loggedInUser._id } } //$ne: not equal
            ]
        })
        .select(USER_SAFE_DATA)
        .skip(skip)   //if skip() then it will pass as skip(0);
        .limit(limit); //if limit() then it will pass as limit(0);

        /* The just aboved version logic can be written this just below as also, both same logic
        const users = await User.find({
                          _id: {
                                  $nin: Array.from(hideUsersFromFeed),
                                  $ne: loggedInUser._id
                               }
                           });
        */

        res.json({ data: users });

    }catch(err){
        res.status(400).json({message: err.message});
    }
});


/* We are getting issue like: user1 have 5users feed so he applied interaction on 5users then feed becomed [] then if another
   user loggedIn so he is getting feed[empty] same instead of 4users, so we asked to solve to chatGptAi so he was saying
   that our frontEnd is correct our backEnd logic not correct so he gave use this below code which is not also solving the issue
   so we commented this and still using askhaySaini FEED logic aboved one but issue still not resolved, which is taking very much
   time to solved so leaving this issue and moving forward and i think akshaySaini didnt noticed this issue, we are doing by
   our own.
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // 1️⃣ Find all connection requests involving logged-in user
    const requests = await connectionRequestModel
      .find({
        $or: [
          { fromUserId: loggedInUser._id },
          { toUserId: loggedInUser._id }
        ]
      })
      .select("fromUserId toUserId");

    // 2️⃣ Build a set of users to hide FROM THIS USER'S FEED
    const hideUsersFromFeed = new Set();

    requests.forEach(req => {
      if (req.fromUserId.toString() === loggedInUser._id.toString()) {
        hideUsersFromFeed.add(req.toUserId.toString());
      } else {
        hideUsersFromFeed.add(req.fromUserId.toString());
      }
    });

    // 3️⃣ Always hide self
    hideUsersFromFeed.add(loggedInUser._id.toString());

    // 4️⃣ Pagination
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // 5️⃣ Fetch users NOT in hide list
    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) }
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    // 6️⃣ Send response
    res.status(200).json({ data: users });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
*/


module.exports= userRouter;
