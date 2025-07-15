import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // optional: auto opens browser
  },
  // 👇 This is critical for React Router
  build: {
    outDir: "dist",
  },
});
