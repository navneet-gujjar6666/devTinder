//This corn logic is working properly, but for current we have disabled in app.js file, as if it is enabeled then our
//mail-(navneetgujjar) will be filled full then no space

const cron = require("node-cron"); //npm i node-corn
const { subDays, startOfDay, endOfDay } = require("date-fns"); //npm i date-fns
const sendEmail = require("./sendEmails.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");


// This job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => {   //this(* * * * *) you can understand on crontab.guru or npm node-corn, for current:
//                                                  it is saying-(8 am, of every day of month, every month, every day of week)
  // Send emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 0); //it is function from-(date-fns), find the previous days--> dayDate

    const yesterdayStart = startOfDay(yesterday);  //it will be like-(00:00 A.M)
    const yesterdayEnd = endOfDay(yesterday);      //it will be like-(11:59 P.M)

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,  //gte: greater than
        $lt: yesterdayEnd      //lt: lesser than
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];   //new Set(); will give non-duplicate entries, [...new Set()] this returns Set(); enteries into array form

    console.log(listOfEmails);

    for (const email of listOfEmails) {
      // Send Emails
      try {
        const res = await sendEmail.run(
          "New Friend Requests pending for " + email,
          "There are so many friend requests pending, please login to DevTinder.in and accept or reject the requests."
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
},
{
    timezone: "Asia/Kolkata",
}
);