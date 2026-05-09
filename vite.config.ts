import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    // GitHub Pages (Project Pages) 部署路径：/<repo>/
    base: "/chacha/",
    plugins: [react()],
});
