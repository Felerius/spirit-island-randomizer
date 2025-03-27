import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  tsr: {
    appDirectory: "src",
  },
  vite: {
    ssr: {
      noExternal: ["@mui/*"],
    },

    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      svgr(),
    ],
  },
});
