import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Import styles
import "./App.css";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the Gemini API
  const genAI = new GoogleGenerativeAI("");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      const responseText = response.text();

      // Split the response into lines
      const responseLines = responseText.split("\n");

      // Add user message and each line of the Gemini response to chat history
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        ...responseLines.map((line) => ({ type: "bot", message: line })),
      ]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">AlumConnect AI</h1>

      <div className="chat-container border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
        <ChatHistory chatHistory={chatHistory} />
        {isLoading && <Loading isLoading={isLoading} />}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>

      <button
        className="mt-4 w-full px-4 py-2 rounded-full bg-gray-400 text-white hover:bg-gray-500 transition duration-200 focus:outline-none"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default Chat;
