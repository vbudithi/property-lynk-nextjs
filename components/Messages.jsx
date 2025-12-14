"use client";
import { useState, useEffect, useMemo } from "react";
import LoadingSpinner from "./LoadingSpinner";
import MessageForm from "./MessageForm";
import { FaInbox } from "react-icons/fa";
import toast from "react-hot-toast";

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

  const orderedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      // unread messages first
      if (a.read !== b.read) {
        return a.read ? 1 : -1;
      }

      // then newer date first
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [messages]);

  const handleMarkRead = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
      });
      if (res.ok) {
        let newReadValue;
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg._id === id) {
              newReadValue = !msg.read;
              return { ...msg, read: newReadValue };
            }
            return msg;
          })
        );
        toast.dismiss();
        toast.success(newReadValue ? "Marked as read" : "Marked as new", {
          className: "toast-progress",
        });
      } else {
        toast.error("Failed to update the status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this message permanently?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        toast.dismiss();
        toast.success("Deleted Successfully", {
          className: "toast-progress",
        });
      } else {
        toast.error("Failed to deleted the message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete the message");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="flex justify-center items-start py-14 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-5xl px-4">
        <div className=" bg-white px-8 py-10 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-blue-100">
          <div className="flex mb-8">
            <FaInbox size={32} className="text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Inbox
              {orderedMessages.length > 0 && `(${orderedMessages.length})`}
            </h1>
          </div>
          <div className="max-h-[650px] overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            {orderedMessages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages found.</p>
            ) : (
              orderedMessages.map((message, index) => (
                <MessageForm
                  key={message._id}
                  message={message}
                  index={index + 1}
                  handleDelete={handleDelete}
                  handleMarkRead={handleMarkRead}
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
