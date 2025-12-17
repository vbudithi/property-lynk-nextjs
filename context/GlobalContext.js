"use client";
import { createContext, useContext, useState, useEffect } from "react";

//create context
const GlobalContext = createContext(null);

//create provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");
        const result = await res.json();
        setUnreadCount(result.data);
      } catch (error) {
        console.error("Failed to fetch unread count", error);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

//create a custom hook to acceess context

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  }
  return context;
}
