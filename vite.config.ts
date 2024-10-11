import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import string from "vite-plugin-string";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    string({
      include: "**/*.css",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
      },
    },
  },
});
