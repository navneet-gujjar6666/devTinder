const { GoogleGenAI }= require("@google/genai");
require("dotenv").config();


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateEmbedding(dataJi) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: dataJi,
  });


  // // console.log(response.embeddings[0].values);
  // return response.embeddings[0].values;

const embedding = response.embeddings[0].values;
// console.log("Embedding length:", embedding.length);
return embedding;
  
}

module.exports = generateEmbedding;