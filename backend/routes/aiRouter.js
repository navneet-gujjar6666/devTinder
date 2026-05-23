const express = require("express");
const aiRouter = express.Router();
const { GoogleGenAI }= require("@google/genai");

require("dotenv").config();


const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

aiRouter.post("/ai", async (req, res) => {
  try {
    const { about } = req.body;
    
    const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `generate a professsional direct bio without explaining-(here are the points) for this topic-(${about}), 
    in 2-3 lines`,
  });

  console.log("actually: ", result);
  console.log(result.text);



    res.status(200).json({
      data: result.text 
    });

  } catch (error) {

    console.error("BACKEND CRASH LOG:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = aiRouter;