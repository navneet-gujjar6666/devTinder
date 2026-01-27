const mongoose= require('mongoose');

const connectionRequestSchema= new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        //instead of-(type: string), because ObjectId is not simple string it is special type as-(objectId:"agshh123hg33gg55")
        required: true,
        //index: true
        ref: "diveIntoDeep" 
    //by using this thing we can fetch data in format like-(virat kohli) instead of-(fromUserId which is difficult to understand),
    //but we have to use populate also in searchingQueery to significantly use this-(ref)
    },
    from: {
        type: String
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "diveIntoDeep", //refrence to User collection
        required: true
    },
    to: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
}, {
    Timestamps: true
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});//Helps in search query if 1million entries in DB as
//it do in this way:
    /*   "akshay":[id1,id2,id3],
       "navneet":[id78,id888],
        "ajay":[id6,id008,id12,id45,id56,id7]
    */

//identicalApproach
connectionRequestSchema.pre("save", function(next){
       const connectionRequest= this;
       // Check if the fromUserId is same as toUserId
       if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
           throw new Error("Cannot send connection request to yourself");
       }
       next();
});

const connectionRequestModel= new mongoose.model("connectionRequest", connectionRequestSchema);

module.exports= connectionRequestModel;