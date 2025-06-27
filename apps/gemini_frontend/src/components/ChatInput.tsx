import { useState } from "react";

interface ChatInputProps {
  onSend: (prompt: string) => void;
  isSending: boolean;
}

export default function ChatInput({ onSend, isSending }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-t bg-white">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border rounded-lg"
        placeholder="Ask Gemini something..."
      />
      <button disabled={input?.trim() === "" || isSending} type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
        Send
      </button>
    </form>
  );
}
