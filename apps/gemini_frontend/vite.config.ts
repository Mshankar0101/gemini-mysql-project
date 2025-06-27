import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows external access (equivalent to 0.0.0.0)
    port: 5173, // Ensure this matches the port you're using
  },
});
