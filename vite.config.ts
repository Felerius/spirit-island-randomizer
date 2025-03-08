import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default {
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
} satisfies UserConfig;
