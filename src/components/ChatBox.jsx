import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

const ChatBox = () => {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Add console.log to verify the query is created
    // console.log("Setting up Firestore listener");

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
      // Temporarily remove orderBy to eliminate potential timestamp issues
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const messagesArray = [];
        // Add console.log to see if we're getting data
        // console.log("Received snapshot:", querySnapshot.size, "documents");

        querySnapshot.forEach((doc) => {
          // Log each document to see the data
          // console.log("Document data:", doc.data());
          messagesArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        // Log the array we're about to set to state
        // console.log("Setting messages:", messagesArray);
        setMessages(messagesArray);
      },
      (error) => {
        // Add error handling
        console.error("Error fetching messages:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add console.log to verify current state
  // console.log("Current messages in state:", messages);

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.length === 0 ? (
        <p>No messages yet...</p>
      ) : (
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;
