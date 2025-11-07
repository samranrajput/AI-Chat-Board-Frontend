import React, { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  return (
    <div className="message-list" ref={ref}>
      {messages.map((m) => (
        <div key={m.id} className={`msg ${m.role}`}>
          <div className="bubble">{m.content}</div>
        </div>
      ))}
    </div>
  );
}
