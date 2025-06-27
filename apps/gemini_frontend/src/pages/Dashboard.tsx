import useSWR from "swr";
import { GeminiMessage } from "../types/dashboard";


import { useState } from "react";
import { fetchHistory, sendPrompt } from "../actions/dashboard";
import ChatHistory from "../components/ChatHistory";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

export default function Dashboard() {
  const { data, mutate } = useSWR<GeminiMessage[]>("chat-history", fetchHistory);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (prompt: string) => {
    if (!data) return;
    setIsSending(true);
    const tempMsg: GeminiMessage = {
      id: Date.now(),
      request: prompt,
      response: "Thinking...",
      created_at: new Date().toISOString(),
    };
    mutate([...data, tempMsg], false);

    try {
      const response = await sendPrompt(prompt);
      const updated = { ...tempMsg, response };
      mutate([...data, updated], true); // revalidate after update
    } catch (err) {
      console.error("Error sending prompt:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-screen">
      {data && <ChatHistory messages={data} />}
      <div className="flex flex-col flex-1 pt-4">
        {data && <ChatMessages messages={data} />}
        <ChatInput isSending={isSending} onSend={handleSend} />
      </div>
    </div>
  );
}
