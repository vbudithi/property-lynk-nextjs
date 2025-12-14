"use client";
import React, { useState, useEffect } from "react";

const UnReadMessageCount = ({ session }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (!session) return;
    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch(`/api/messages/unread-count`);
        if (res.status === 200) {
          const result = await res.json();
          setUnreadCount(result.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadMessages();
  }, [session]);
  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full cursor-pointer">
        {unreadCount}
      </span>
    )
  );
};

export default UnReadMessageCount;
