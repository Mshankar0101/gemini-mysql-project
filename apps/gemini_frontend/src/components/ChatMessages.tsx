import { GeminiMessage } from "../types/dashboard";

interface Props {
  messages: GeminiMessage[];
}

export default function ChatMessages({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages?.map((msg) => (
        <div key={msg.id}>
          <div>
            <span className="text-blue-600 font-semibold">You:</span> {msg?.request}
          </div>
          <div>
            <span className="text-green-600 font-semibold">Gemini:</span> {msg?.response}
          </div>
        </div>
      ))}
    </div>
  );
}
