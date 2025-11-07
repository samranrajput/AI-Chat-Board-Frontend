import React, { useState } from "react";

export default function MessageInput({ onSend, loading }) {
  const [text, setText] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="input-row" onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={loading ? "Thinking..." : "Type your message..."}
        disabled={loading}
      />
      <button disabled={loading}>Send</button>
    </form>
  );
}
