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
    <section className="bg-blue-50 justify-center items-center">
      <div className="container m-auto py-14 max-w-7xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-4xl font-bold mr-2 ">Inbox</h1>
            <FaInbox size={25} className="text-gray-500" />
          </div>
          <div className="max-h-[620px] overflow-y-auto pr-2 space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages found.</p>
            ) : (
              messages.map((message) => (
                <MessageForm key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
