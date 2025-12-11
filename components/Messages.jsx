"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import MessageForm from "./MessageForm";
import { FaInbox } from "react-icons/fa";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data.data);
        }
      } catch (error) {
        console.log("Error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="flex justify-center items-start py-14 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-5xl px-4">
        <div className=" bg-white px-8 py-10 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-blue-100">
          <div className="flex justify-center items-center mb-8">
            <FaInbox size={32} className="text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Inbox
              {messages.length > 0 && `(${messages.length})`}
            </h1>
          </div>
          <div className="max-h-[650px] overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages found.</p>
            ) : (
              messages.map((message, index) => (
                <MessageForm
                  key={message._id}
                  message={message}
                  index={index + 1}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
