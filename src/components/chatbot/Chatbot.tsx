"use client";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import React, { useState } from "react";
import { X, User, Bot } from "lucide-react";

// Using a message icon SVG since BiSolidMessageSquareDetail isn't available
const MessageIcon = () => (
 <BiSolidMessageSquareDetail className="w-5 h-5 text-white"/>
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

  const preMadeQuestions = [
    "Your pre-made question will be here?",
    "Your pre-made question will be here?",
    "Your pre-made question will be here?",
    "Your pre-made question will be here?",
    "Your pre-made question will be here?",
  ];

  const handleQuestionClick = (question:string) => {
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for your question! I'm here to help you with any queries you might have.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
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

      {/* Chat Popup - positioned relative to the button */}
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard
                  dummy text ever since the 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type
                  specimen book.
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
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
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