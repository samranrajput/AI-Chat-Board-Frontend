import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatBoard() {
  const [messages, setMessages] = useState([
    { id: 1, role: "system", content: "You are a helpful assistant." },
    { id: 2, role: "system", content: "Hello How Are You!!!" },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMessage = { id: Date.now(), role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      const resp = await fetch(
        "https://ai-chat-board-using-react.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        }
      );
      const data = await resp.json();
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, role: "assistant", content: "Error!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-board">
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} loading={loading} />
    </div>
  );
}
