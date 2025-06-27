import { GeminiMessage } from "../types/dashboard";

interface Props {
  messages: GeminiMessage[];
}

export default function ChatHistory({ messages }: Props) {
  return (
    <aside className="w-64 h-full bg-gray-100 p-4 overflow-y-auto border-r">
      <h2 className="text-lg font-bold mb-4">History</h2>
      {messages.map((msg) => (
        <div key={msg?.id} className="text-sm text-gray-700 mb-2 truncate">
          {msg.request}
        </div>
      ))}
    </aside>
  );
}
