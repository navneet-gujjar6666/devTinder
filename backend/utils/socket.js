const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chatSchema.js");
const ConnectionRequest = require("../models/connectionRequest.js");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "https://your-frontend.vercel.app",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      // console.log(firstName + "joined Room : " + roomId);
      socket.join(roomId);
    });

    socket.on("typing", ({ firstName, userId, targetUserId }) => {
      

      const roomId = getSecretRoomId(userId, targetUserId);
      socket.to(roomId).emit("userTyping", firstName);
    });

    socket.on("markSeen", async ({ userId, targetUserId }) => {
      
      const roomId = getSecretRoomId(userId, targetUserId);

      const chat = await Chat.findOne({
        participants: { $all: [userId, targetUserId] },
      });

      if(!chat) return;

      chat.messages.forEach((msg) => {
        if (msg.senderId.toString() === targetUserId && !msg.seen) {
          msg.seen = true;
        }
      });

      await chat.save();

      io.to(roomId).emit("messagesSeen");
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        // Save messages to the database
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " " + text);

          // TODO: Check if userId & targetUserId are friends

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          const ok = chat.messages[chat.messages.length - 1].createdAt;

          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            ok,
          });

        } catch (err) {
          console.log(err);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
