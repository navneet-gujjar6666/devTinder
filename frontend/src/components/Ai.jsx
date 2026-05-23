import React from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constatnts";

const Ai = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(loading) return;
    setLoading(true);
    try {
      console.log("f1");
      const res = await axios.post(BASE_URL+ "/ai", {
        prompt,
      },{
        withCredentials: true
      });
      console.log("f2");
      setResponse(res.data.data);
    } catch (err) {
      console.error("Error fetching Gemini response:", err);
      setResponse("Failed to get a response.");
    }
    setLoading(false);
  };



  return (
    <div style={{ padding: "20px" }}>
      <h2>Ask Gemini AI</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          rows="4"
          style={{ width: "100%" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Generate"}
        </button>
      </form>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Ai;
