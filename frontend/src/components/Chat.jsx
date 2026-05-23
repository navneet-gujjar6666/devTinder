import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socketFrontEnd.js";
import axios from "axios";
import { BASE_URL } from "../utils/constatnts.js";
import ok from "../backgroundImages/wallpaper.jpg";
import { Plus } from 'lucide-react';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const socketRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [targetedUser, setTargetedUser] = useState(null);
  const [jao, setJao]= useState(false);



  const formatTime = (createdAt) => {
    const createdTime = new Date(createdAt);
    const now = new Date();

    const diffMs = now - createdTime;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    // under 1 hour
    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    // under 24 hours
    if (hours < 24) {
      return `${hours} hr ago`;
    }

    // otherwise full date
    return createdTime.toLocaleDateString();
  };

  const fetchChatMessages = async () => {
    const info = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const { chat, targetedUser}= info.data;
    // console.log(targetedUser.firstName);
    setTargetedUser(targetedUser);

    const chatMessages = chat?.messages.map((msg) => {
      const { senderId, text, createdAt, seen } = msg;
      const time = formatTime(createdAt);
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        time,
        text,
        seen,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);


  useEffect(() => {

  if (!userId) {
    return;
  }

  socketRef.current = createSocketConnection();

  socketRef.current.emit("joinChat", {
    firstName: user.firstName,
    userId,
    targetUserId,
  });

  //It is for first time chat load when user opens chat so every message will become as seen
  socketRef.current.emit("markSeen", {
    userId,
    targetUserId,
  });

  socketRef.current.on("messagesSeen", async () => {

    await fetchChatMessages();

  });

  socketRef.current.on(
    "messageReceived",
    ({ firstName, lastName, text, ok }) => {

      console.log(firstName + " : " + text);

      const time = formatTime(ok);

      setMessages((messages) => [
        ...messages,
        { firstName, lastName, time, text },
      ]);

      // instantly mark newly received message as seen
      socketRef.current.emit("markSeen", {
        userId,
        targetUserId,
      });
    }
  );

  socketRef.current.on("userTyping", (firstName) => {

    setTypingUser(firstName);

    setTimeout(() => {
      setTypingUser("");
    }, 1000);

  });

  return () => {
    socketRef.current.disconnect();
  };

}, [userId, targetUserId]);





  const sendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }

    // const socket = createSocketConnection();
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };


  const handlePayment= ()=>{

    setJao(true);
    setTimeout(()=>{
       setJao(false);
    }, 3000);

  }


    const handleBuy = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };





  return (
    <div
      className="
      w-[95vw] sm:w-[90vw] md:w-3/4
      mx-auto
      border border-gray-600
      my-4 sm:m-5
      h-[78vh] sm:h-[70vh]
      flex flex-col
      relative
      overflow-hidden
    "
    >
      <div className="header flex relative">
        <h1
          className="
          p-4 sm:p-5
          border-b border-gray-600
          bg-green-800
          text-xl sm:text-3xl
          font-bold text-white
          w-full
        "
        >
          Chatting
        </h1>

        {targetedUser && (
          <div
            className="
            flex items-center gap-2 sm:gap-3
            absolute right-2 sm:right-4
            top-2
          "
          >
            <p className="text-white font-semibold text-sm sm:text-lg max-w-[90px] sm:max-w-none truncate">
              {targetedUser.firstName}
            </p>

            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-black">
              <img
                src={targetedUser.photoUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div
        className="backgroundImage flex-1 overflow-auto p-2 sm:p-5 bg-cover bg-center bg-repeat relative"
        style={{ backgroundImage: `url(${ok})` }}
      >
        <div className="flex-1 p-2 sm:p-5">
          {messages.map((msg, index) => {
            const value = user.firstName === msg.firstName;

            return (
              <div
                key={index}
                className={
                  "chat " +
                  (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-header text-xs sm:text-sm">
                  {`${msg.firstName} ${msg.lastName}`}
                </div>

                <div
                  className={`
                  chat-bubble
                  ${value ? "bg-green-500" : "bg-red-500"}
                  text-sm sm:text-[17px]
                  relative
                  max-w-[75vw] sm:max-w-md
                  break-words
                `}
                >
                  {msg.text}

                  <div className="time flex justify-end items-end gap-1 mt-1">
                    <time className="text-[10px] sm:text-xs opacity-50">
                      {msg.time}
                    </time>

                    <div className="text-[9px] sm:text-[10px]">
                      {msg.seen ? "✓✓ Seen" : "✓ Sent"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {typingUser && (
        <div className="px-3 sm:px-5 py-2 text-white italic bg-green-700 text-sm sm:text-base">
          {typingUser} is typing...
        </div>
      )}

      {jao && (
        <div
          className="
          pay chat-bubble
          bg-blue-500 text-white font-bold
          h-10 w-14 sm:w-15
          absolute bottom-24 sm:bottom-22
          right-4 sm:right-20
          cursor-pointer
          text-sm
          flex items-center justify-center
        "
          onClick={() => handleBuy("silver")}
        >
          PAY
        </div>
      )}

      <div
        className="
        p-3 sm:p-5
        border-t border-gray-600
        bg-green-900
        flex items-center gap-2
      "
      >
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);

            socketRef.current.emit("typing", {
              firstName: user.firstName,
              userId,
              targetUserId,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="
          flex-1
          min-w-0
          border border-gray-500
          bg-white text-black
          rounded
          p-2
          text-sm sm:text-base
        "
        />

        <button
          onClick={handlePayment}
          className="
          bg-pink-600
          rounded-3xl
          p-2
          flex-shrink-0
        "
        >
          <Plus size={18} />
        </button>

        <button
          onClick={sendMessage}
          className="
          btn btn-secondary bg-amber-400
          btn-sm sm:btn-md
          flex-shrink-0
        "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
