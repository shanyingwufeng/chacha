import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    // 本地 dev 用根路径，避免出现 http://localhost:5173/chacha/ 的困扰
    // GitHub Pages (Project Pages) 构建产物需要 /<repo>/ 前缀
    base: command === "build" ? "/chacha/" : "/",
    plugins: [react()],
}));
