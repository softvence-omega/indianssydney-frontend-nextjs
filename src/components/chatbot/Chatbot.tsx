"use client";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import React, { useState } from "react";
import { X, User, Bot } from "lucide-react";
import { usePostChatbotMutation } from "@/store/features/chatbot/chatbot.api";

const MessageIcon = () => (
  <BiSolidMessageSquareDetail className="w-5 h-5 text-white" />
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there, How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [postChatbot, { isLoading }] = usePostChatbotMutation();

  const preMadeQuestions = [
    "How to log into this site?",
    "What are the features of this platform?",
    "How can I reset my password?",
    "Where can I find support?",
    "What is the pricing model?",
  ];

  const handleQuestionClick = async (question: string) => {
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await postChatbot({ user_message: question }).unwrap();
      console.log("Chatbot response", response);
      const botResponse = {
        id: messages.length + 2,
        text:
          response?.bot_response || "Sorry, I could not process your request.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in handleQuestionClick:", error);
      const botResponse = {
        id: messages.length + 2,
        text: "Something went wrong. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await postChatbot({ user_message: input }).unwrap();
      console.log("Chatbot response for custom input:", response);
      const botResponse = {
        id: messages.length + 2,
        text:
          response?.bot_response || "Sorry, I could not process your request.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      const botResponse = {
        id: messages.length + 2,
        text: "Something went wrong. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <div
        className="p-3 rounded-xl bg-orange-500 hover:bg-orange-600 cursor-pointer shadow-lg transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <MessageIcon />
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 max-w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-gray-800">Chat Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.sender === "bot" ? "bg-gray-100" : "bg-orange-500"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-4 h-4 text-gray-600" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "bot"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Pre-made Questions */}
            {messages.length === 1 && (
              <div className="space-y-2 mt-4">
                {preMadeQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-xl transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Lorem Ipsum Text */}
            {messages.length === 1 && (
              <div className="mt-6 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-2 mb-2">
                  <Bot className="w-4 h-4 text-gray-400 mt-1" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ask me anything about the platform, and I’ll do my best to
                  assist you!
                </p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chatbot;
