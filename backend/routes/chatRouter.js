const express = require("express");
const { userAuth } = require("../middleWares/auth.js");
const { Chat } = require("../models/chatSchema.js");
const User = require("../models/userSchema.js");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  try {


    const targetedUser = await User.findById(targetUserId).select(
      "firstName photoUrl"
    );

    if (!targetedUser) {
      return res.status(404).json({
        message: "Target user not found",
      });
    }


    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });

   if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }

    res.json({
      chat, 
      targetedUser
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = chatRouter;