import axios from "axios";
import { GeminiMessage } from "../types/dashboard";

const API_BASE = "http://localhost:3000/api";

export const fetchHistory = async (): Promise<GeminiMessage[]> => {
  try {
    const res = await axios.get(`${API_BASE}/history`);
    return res.data.history;
  } catch (err) {
    console.error("Fetch history error:", err);
    throw err;
  }
};

export const sendPrompt = async (prompt: string): Promise<string> => {
  try {
    const res = await axios.post(`${API_BASE}/ask`, { prompt });
    return res.data.response;
  } catch (err) {
    console.error("Send prompt error:", err);
    throw err;
  }
};
